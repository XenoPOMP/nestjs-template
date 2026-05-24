import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import '../dayjs';

describe('dayjs plugin setup', () => {
  describe('root', () => {
    it('should apply plugins', () => {
      const today = dayjs(Date.now()).startOf('day');
      expect(today.format('HH:mm:ss')).toStrictEqual('00:00:00');
      expect(today.format()).toMatch(/T(\d{2}:*){3}\+(\d{2}:*){2}$/);
    });

    it('should stringify properly', () => {
      const today = dayjs(Date.now()).startOf('day');
      const json = today.toJSON();
      expect(json).toMatch(/^(\d-*)+T(\d{2}:*){3}\+(\d{2}:*){2}$/);
    });
  });
});
