import { beforeEach, describe, expect, it } from 'vitest';

import { EnvironmentModule } from '@/features/environment/environment.module';
import { EnvironmentService } from '@/features/environment/environment.service';

import { extractInjectable } from '@test/assets';

import { getJwtConfig } from '../jwt.config';

describe('jwt config generator', () => {
  let env: EnvironmentService;

  beforeEach(async () => {
    const [service] = await extractInjectable({
      imports: [EnvironmentModule],
      type: EnvironmentService,
    });
    env = service;
  });

  describe('root', () => {
    it('should generate config', async () => {
      const config = await getJwtConfig(env);
      expect(config.secret).toStrictEqual('testing-secret');
    });
  });
});
