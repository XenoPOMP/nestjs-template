import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EnvironmentModule } from '@/features/environment/environment.module';

import { extractInjectable } from '@test/assets';

import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('PrimaService', () => {
  const logSpy = vi.spyOn(console, 'debug');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: PrismaService;

  beforeEach(async () => {
    const [newService] = await extractInjectable({
      imports: [EnvironmentModule, PrismaModule],
      type: PrismaService,
    });
    service = newService;
  });

  describe('root', () => {
    it('should connect', () => {
      expect(logSpy).not.toHaveBeenCalledWith('prisma connected');
    });
  });
});
