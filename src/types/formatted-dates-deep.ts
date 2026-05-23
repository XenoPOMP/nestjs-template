import type { Dayjs } from 'dayjs';
import type { AnyObject } from 'xenopomp-essentials';

/**
 * Recursively finds all Date fields and
 * changes them to Dayjs.
 */
export type FormattedDatesDeep<T extends AnyObject> = {
  [Key in keyof T]: T[Key] extends AnyObject
    ? FormattedDatesDeep<T[Key]>
    : T[Key] extends Date
      ? Dayjs
      : T[Key];
};
