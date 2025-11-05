import { StrictOmit } from 'xenopomp-essentials';

export type SelectiveRequired<T, K extends keyof T> = StrictOmit<T, K> &
  Required<Pick<T, K>>;
