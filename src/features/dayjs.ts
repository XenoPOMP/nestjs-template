import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

// Catch Dayjs return inside any HTTP-response and format this as string.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
dayjs.prototype.toJSON = function () {
  return (this as Dayjs).format();
};
