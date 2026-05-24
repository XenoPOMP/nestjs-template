import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ArgonModule } from '@/features/argon/argon.module';
import { EnvironmentModule } from '@/features/environment/environment.module';

import { ArgonService } from './argon.service';

describe('ArgonService', () => {
  let argonService: ArgonService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule, ArgonModule],
    }).compile();

    argonService = app.get(ArgonService);
  });

  describe('root', () => {
    it('should hash', async () => {
      const originalString = 'dummy';
      const hashed: string = await argonService.hash(originalString);
      expect(hashed).toMatch(/^\$argon2id/);
    });

    it('should verify valid string', async () => {
      const hashed: string = await argonService.hash('dummy');
      const isValid: boolean = await argonService.verify(hashed, 'dummy');
      expect(isValid).toBeTruthy();
    });

    it('should verify invalid strings', async () => {
      const hashed: string = await argonService.hash('dummy');
      const isValid: boolean = await argonService.verify(hashed, 'not-dummy');
      expect(isValid).toBeFalsy();
    });
  });
});
