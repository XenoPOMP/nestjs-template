import type { StrictOmit } from 'xenopomp-essentials';

import type { SanitizedUser } from '@/types/sanitized-user';

import type { Tokens } from './tokens';

export type RefreshTokensResponse = {
  user: SanitizedUser;
} & Tokens;

export type LoginResponse = StrictOmit<RefreshTokensResponse, 'refreshToken'>;
