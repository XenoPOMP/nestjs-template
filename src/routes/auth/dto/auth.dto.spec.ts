import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';

import { AuthDto } from './auth.dto';

describe('AuthDto', () => {
  describe('root', () => {
    it('should prevent empty object creating', async () => {
      const dto = new AuthDto();
      const errors = await validate(dto);
      // We should have 2 errors
      expect(errors.length).toBe(2);

      const [loginError, passwordError] = errors;
      expect(loginError.property).toStrictEqual('login');
      expect(passwordError.property).toStrictEqual('password');
    });
  });
});
