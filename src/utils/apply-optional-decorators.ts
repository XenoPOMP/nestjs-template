import { applyDecorators } from '@nestjs/common';
import type { Optional } from 'xenopomp-essentials';

import type { AnyDecorator, AppliedDecorators } from '@/types/any-decorator';

/**
 * Apply decorators conditionally.
 * @param decorators
 */
export default function applyOptionalDecorators(
  ...decorators: Optional<AnyDecorator>[]
): AppliedDecorators {
  const definedDecorators: AnyDecorator[] = decorators.filter(
    dec => dec !== undefined,
  );
  return applyDecorators(...definedDecorators);
}
