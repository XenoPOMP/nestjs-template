import type { applyDecorators } from '@nestjs/common';
import type { ArrayItemType } from 'xenopomp-essentials';

export type AppliedDecorators = ReturnType<typeof applyDecorators>;
export type AnyDecorator = ArrayItemType<Parameters<typeof applyDecorators>>;
