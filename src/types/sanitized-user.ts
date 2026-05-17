import type { PartialDeep } from 'type-fest';
import type { StrictOmit } from 'xenopomp-essentials';

import type { User } from '~prisma/client';

export type SanitizedUser<Shape extends PartialDeep<User> = User> = StrictOmit<
  Shape,
  'password'
>;
