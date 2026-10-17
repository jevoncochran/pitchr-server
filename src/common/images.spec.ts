import { readFileSync } from 'fs';
import { join } from 'path';
import sharp = require('sharp');
import { isHeic, toJpegIfHeic } from './images';

// A real HEIC photo (made with macOS sips), like the ones iPhones upload
const HEIC = readFileSync(join(__dirname, '__fixtures__', 'tiny.heic'));

const upload = (buffer: Buffer, mimetype: string, originalname: string) =>
  ({
    buffer,
    mimetype,
    originalname,
    size: buffer.length,
  }) as Express.Multer.File;

describe('images', () => {
  it('spots HEIC by its content, even when it is labeled something else', () => {
    expect(isHeic(upload(HEIC, 'application/octet-stream', 'IMG_1.HEIC'))).toBe(
      true,
    );
    expect(
      isHeic(upload(Buffer.from('not an image'), 'image/heic', 'x.heic')),
    ).toBe(true);
    expect(
      isHeic(
        upload(Buffer.from('\xff\xd8\xff plain jpeg'), 'image/jpeg', 'x.jpg'),
      ),
    ).toBe(false);
  });

  it('turns a HEIC photo into a JPEG that sharp can read', async () => {
    const converted = await toJpegIfHeic(
      upload(HEIC, 'image/heic', 'IMG_0137.HEIC'),
    );

    expect(converted.mimetype).toBe('image/jpeg');
    expect(converted.originalname).toBe('IMG_0137.jpg');
    expect(converted.size).toBe(converted.buffer.length);
    const meta = await sharp(converted.buffer).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual(['jpeg', 120, 80]);
  });

  it('leaves other photos alone', async () => {
    const jpeg = await sharp({
      create: { width: 10, height: 10, channels: 3, background: '#fff' },
    })
      .jpeg()
      .toBuffer();
    const file = upload(jpeg, 'image/jpeg', 'card.jpg');

    expect(await toJpegIfHeic(file)).toBe(file);
  });
});
