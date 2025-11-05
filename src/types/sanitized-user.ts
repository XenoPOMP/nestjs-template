import { User } from '@prisma/client';
import { StrictOmit } from 'xenopomp-essentials';

export type SanitizedUser = StrictOmit<User, 'password'>;
