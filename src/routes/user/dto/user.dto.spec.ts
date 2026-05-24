import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';

import { UserDto } from './user.dto';

describe('UserDto', () => {
  describe('root', () => {
    it('should validate empty objects', async () => {
      const user = new UserDto();
      // Errors should be empty, because all fields in dto are
      // optional
      const errors = await validate(user);
      expect(errors.length).toStrictEqual(0);
    });
  });
});
