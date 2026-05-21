import type { Undefinable } from 'xenopomp-essentials';

import type { AnyDecorator } from '@/types/any-decorator';

/**
 * Apply decorators conditionally.
 * @param decorators
 */
export default function applyOptionalDecorators(
  ...decorators: Undefinable<AnyDecorator>[]
): AnyDecorator[] {
  return decorators.filter(dec => dec !== undefined);
}
