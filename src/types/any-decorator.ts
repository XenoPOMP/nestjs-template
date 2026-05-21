import type { applyDecorators } from '@nestjs/common';
import type { ArrayItemType } from 'xenopomp-essentials';

export type AnyDecorator = ArrayItemType<Parameters<typeof applyDecorators>>;
