import type { StrictOmit } from 'xenopomp-essentials';

import type { User } from '~prisma/client';

import type { SelectKeys } from '@/types/select-keys';

/**
 * Defines keys that have to be excluded from User-related HTTP responses.
 */
export type UserSensitiveKeys = SelectKeys<
  User,
  'password' | 'login' | 'id' | 'updatedAt'
>;

/**
 * Defines a return-safe User type with erased sensitive data.
 */
export type SanitizedUser = StrictOmit<User, UserSensitiveKeys>;
