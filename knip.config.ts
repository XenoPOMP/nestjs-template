import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  project: ['**/*.spec.ts!'],
  ignoreDependencies: [
    /@nestjs/,
    /@prisma/,
    'argon2',
    'zod',
    'passport',
    'passport-jwt',
    'xenopomp-essentials',
    /eslint/,
    /^@types\//,
  ],
};

export default config;
