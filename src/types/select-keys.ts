import type { AnyObject } from 'xenopomp-essentials';

/**
 * Strictly select keys that are presented on some object-type.
 *
 * @example
 * type Frame = {
 *   width: number;
 *   height: number;
 *   orientation: 'horizontal' | 'vertical';
 * };
 *
 * type Dimensions = SelectKeys<Frame, 'height' | 'width'>;
 * //    ^? "height" | "width"
 */
export type SelectKeys<Obj extends AnyObject, Keys extends keyof Obj> = Keys;
