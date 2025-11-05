import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

/**
 * This service utilizes zod and @nestjs/config under the hood
 * to provide type-safe env object.
 */
@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Convert nest.js config response to Zod parsed schema.
   * @throws The whole app will be downed if .env file is incorrect.
   */
  schema() {
    return environmentSchema.parse(process.env);
  }
}

const environmentSchema = z.object({
  // For docker compose
  PGDATABASE: z.string(),
  PGUSER: z.string(),
  PGPASSWORD: z.string(),

  // For local Prisma development
  DATABASE_URL: z.string().optional(),

  // For cookie assignee
  APP_HOST: z.string(),

  // Other
  NODE_ENV: z
    .union([
      z.literal('development'),
      z.literal('production'),
      z.literal('test'),
    ])
    .default('development'),
});

export type EnvironmentSchema = z.infer<typeof environmentSchema>;
