import type { StrictOmit } from 'xenopomp-essentials';

import type { User } from '~prisma/client';

export type UserSensitiveKeys = 'password' | 'login' | 'id';
export type SanitizedUser = StrictOmit<User, UserSensitiveKeys>;
