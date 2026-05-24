import { IsOptional, MaxLength, MinLength } from 'class-validator';

import type { AppliedDecorators } from '@/types/any-decorator';
import applyOptionalDecorators from '@/utils/apply-optional-decorators';

export const IsRequiredString = (
  options?: StringDecoratorOptions,
): AppliedDecorators => {
  const min = options?.min;
  const max = options?.max;

  return applyOptionalDecorators(
    !!min
      ? MinLength(min[0], {
          message: min[1],
        })
      : undefined,

    !!max
      ? MaxLength(max[0], {
          message: max[1],
        })
      : undefined,
  );
};

export const IsOptionalString = (
  options?: StringDecoratorOptions,
): AppliedDecorators => {
  return applyOptionalDecorators(IsOptional(), IsRequiredString(options));
};

interface StringDecoratorOptions {
  min?: [value: number, message: string];
  max?: [value: number, message: string];
}
