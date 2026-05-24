import { extractInjectable } from '@test/assets';

import { EnvironmentModule } from './environment.module';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let env: EnvironmentService;
  const OLD_ENV = process.env;

  beforeEach(async () => {
    await parseEnv();
  });

  afterEach(() => {
    // Reset env after each test
    process.env = OLD_ENV;
  });

  describe('root', () => {
    it('should calculate production status', () => {
      const isProd: boolean = env.isProduction();
      expect(isProd).toBeFalsy();
    });

    it('should calculate production status (if NODE_ENV=production)', async () => {
      // Mock NODE_ENV
      process.env.NODE_ENV = 'production';
      await parseEnv();
      // Should be true
      const isProd: boolean = env.isProduction();
      expect(isProd).toBeTruthy();
    });
  });

  async function parseEnv(): Promise<void> {
    const [envService] = await extractInjectable({
      imports: [EnvironmentModule],
      type: EnvironmentService,
    });

    env = envService;
  }
});
