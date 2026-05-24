import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { EnvironmentModule } from '@/features/environment/environment.module';

import { extractInjectable } from '@test/assets';

import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('PrimaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const [newService] = await extractInjectable({
      imports: [EnvironmentModule, PrismaModule],
      type: PrismaService,
    });
    service = newService;
    await service.$disconnect();
  });

  afterEach(async () => {
    await service.$disconnect();
  });

  describe('root', () => {
    it('should connect', async () => {
      // Calling PrismaClient directly
      await expect(service.$connect()).resolves.not.toThrow();
      await expectConnected();
    });

    it('should connect (module lifecycle)', async () => {
      // Calling OnModuleInit method
      await expect(service.onModuleInit()).resolves.not.toThrow();
      await expectConnected();
    });

    it.skip('should disconnect', async () => {
      // Calling PrismaClient directly
      await service.$connect();
      await service.$disconnect();
      await expectDisconnected();
    });

    it.skip('should disconnect (module lifecycle)', async () => {
      // Calling OnModuleDestroy
      await service.$connect();
      await service.onModuleDestroy();
      await expectDisconnected();
    });
  });

  async function expectConnected(): Promise<void> {
    await expect(checkConnection()).resolves.toBeTruthy();
  }

  async function expectDisconnected(): Promise<void> {
    await expect(checkConnection()).resolves.toBeFalsy();
  }

  async function checkConnection(): Promise<boolean> {
    try {
      await service.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
});
