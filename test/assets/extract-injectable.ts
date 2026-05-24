import type { ModuleMetadata, Type } from '@nestjs/common';
import type { TestingModule, TestingModuleOptions } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

/**
 * Helper function to organize extraction of Injectable more properly.
 */
export async function extractInjectable<TType extends Type<any>>(
  meta: ModuleMetadata & {
    type: TType;
  },
  options?: TestingModuleOptions,
): Promise<[injectable: InstanceType<TType>, app: TestingModule]> {
  // Parse metadata
  const { type, ...metadata } = meta;

  // Build app
  const app: TestingModule = await Test.createTestingModule(
    metadata,
    options,
  ).compile();

  // Get class instance
  const injectable = app.get<InstanceType<TType>>(type);
  return [injectable, app];
}
