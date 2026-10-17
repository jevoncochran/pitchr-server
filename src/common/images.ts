// Photos from iPhones often arrive as HEIC, which sharp's standard build can't
// decode and most browsers (other than Safari) can't show. They're converted to
// JPEG when uploaded, so everything stored is a JPEG.
import heicDecode = require('heic-decode');
import sharp = require('sharp');

// The HEIF "brands" an iPhone (and other HEIC writers) put at the start of the file
const HEIC_BRANDS = new Set([
  'heic',
  'heix',
  'hevc',
  'hevx',
  'heim',
  'heis',
  'mif1',
  'msf1',
]);

/** HEIC by its content, whatever the browser called it (it's often mislabeled). */
export function isHeic(file: { buffer: Buffer; mimetype: string }): boolean {
  if (file.mimetype === 'image/heic' || file.mimetype === 'image/heif') {
    return true;
  }
  const buffer = file.buffer;
  return (
    buffer.length >= 12 &&
    buffer.toString('ascii', 4, 8) === 'ftyp' &&
    HEIC_BRANDS.has(buffer.toString('ascii', 8, 12))
  );
}

/** The same upload as a JPEG if it was HEIC; anything else is returned as is. */
export async function toJpegIfHeic(
  file: Express.Multer.File,
): Promise<Express.Multer.File> {
  if (!isHeic(file)) return file;
  // heic-decode only decodes (pure JavaScript, independent of how sharp was
  // built); sharp encodes the JPEG, which is much faster and lighter than
  // encoding in JavaScript
  const { width, height, data } = await heicDecode({ buffer: file.buffer });
  const jpeg = await sharp(
    Buffer.from(data.buffer, data.byteOffset, data.byteLength),
    { raw: { width, height, channels: 4 } },
  )
    .jpeg({ quality: 85 })
    .toBuffer();
  return {
    ...file,
    buffer: jpeg,
    size: jpeg.length,
    mimetype: 'image/jpeg',
    originalname: file.originalname.replace(/\.(heic|heif)$/i, '') + '.jpg',
  };
}
