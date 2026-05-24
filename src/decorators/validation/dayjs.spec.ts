import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';

import { IsDayjsString } from '@/decorators/validation/dayjs';

class TestDto {
  @IsDayjsString()
  date!: string;
}

describe('IsDayjsString decorator', () => {
  describe('root', () => {
    it('should disallow non Dayjs strings', async () => {
      const dto = new TestDto();
      dto.date = 'sus';

      // Wrong string, got 1 error
      let errors = await validate(dto);
      expect(errors.length).toStrictEqual(1);

      dto.date = '2026-05-24T13:43:57+02:00';
      errors = await validate(dto);
      expect(errors.length).toStrictEqual(0);
    });
  });
});
