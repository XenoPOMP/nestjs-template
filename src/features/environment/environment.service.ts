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
 *     const { NODE_ENV } = this.env.schema;
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
  /** This schema is being parsed on service initialization. */
  readonly schema: z.infer<typeof environmentSchema>;

  constructor(private readonly configService: ConfigService) {
    this.schema = environmentSchema.parse(process.env);
  }

  /**
   * Simply checks if `NODE_ENV` equals to `production`
   */
  isProduction(): boolean {
    const { NODE_ENV } = this.schema;
    return NODE_ENV === 'production';
  }
}

const environmentSchema = z.object({
  DATABASE_URL: z.string(),

  // For cookie assignee
  APP_HOST: z.string().min(1, { message: 'Field cannot be empty' }),

  JWT_SECRET: z.string().min(1, { message: 'Field cannot be empty' }),
  ARGON_SECRET: z.string().min(1, { message: 'Field cannot be empty' }),

  NODE_ENV: z
    .union([
      z.literal('development'),
      z.literal('production'),
      z.literal('test'),
    ])
    .optional(),

  ALLOW_CROSS_ORIGIN: z
    .string()
    .optional()
    .transform(str => str === 'true'),
});

export type EnvironmentSchema = z.infer<typeof environmentSchema>;
