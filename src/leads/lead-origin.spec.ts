import { BadRequestException } from '@nestjs/common';
import { originFields } from './lead-origin';

describe('originFields', () => {
  it('keeps the description only with Other', () => {
    expect(originFields({ origin: 'OTHER', originOther: ' Podcast ' })).toEqual(
      {
        origin: 'OTHER',
        originOther: 'Podcast',
      },
    );
    expect(originFields({ origin: 'DM', originOther: 'Podcast' })).toEqual({
      origin: 'DM',
      originOther: null,
    });
  });

  it('treats an empty origin as not known', () => {
    expect(originFields({ origin: '' })).toEqual({
      origin: null,
      originOther: null,
    });
  });

  it('rejects old and unknown values', () => {
    expect(() => originFields({ origin: 'OUTREACH' })).toThrow(
      BadRequestException,
    );
  });
});
