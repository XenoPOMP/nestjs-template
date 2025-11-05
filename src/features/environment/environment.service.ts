import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

/**
 * This service utilizes zod and @nestjs/config under the hood
 * to provide type-safe env object.
 *
 * @example
 * constructor(private readonly env: EnvironmentService) {}
 *
 *   getHello() {
 *     // Parse env with zod schema.
 *     const { NODE_ENV } = this.env.schema();
 *     const isProduction: boolean = this.env.isProduction();
 *
 *     return {
 *       message: 'Hello World!',
 *       debug: {
 *         env: NODE_ENV,
 *         isProduction,
 *       },
 *     };
 *   }
 */
@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Convert nest.js config response to Zod parsed schema.
   * @throws Whole app will be downed if .env file is incorrect.
   */
  schema() {
    return environmentSchema.parse(process.env);
  }

  /**
   * Simply checks if `NODE_ENV` equals to `production`
   */
  isProduction(): boolean {
    const { NODE_ENV } = this.schema();
    return NODE_ENV === 'production';
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
  JWT_SECRET: z.string(),
  NODE_ENV: z
    .union([
      z.literal('development'),
      z.literal('production'),
      z.literal('test'),
    ])
    .default('development'),
});

export type EnvironmentSchema = z.infer<typeof environmentSchema>;
