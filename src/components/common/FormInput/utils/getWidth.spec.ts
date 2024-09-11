import { describe, it, expect } from 'vitest';
import { getWidth } from './getWidth';

describe('When getWidth is called,', () => {
  describe('and the size "small" is passed to it.', () => {
    it('Then it should return 180px.', () => {
      const result = getWidth('small');
      expect(result).toBe('180px');
    });
  });

  describe('and the size "medium" is passed to it.', () => {
    it('Then it should return 240px.', () => {
      const result = getWidth('medium');
      expect(result).toBe('240px');
    });
  });

  describe('and the size "large" is passed to it.', () => {
    it('Then it should return 480px.', () => {
      const result = getWidth('large');
      expect(result).toBe('480px');
    });
  });

  describe('and "undefined" is passed to it.', () => {
    it('Then it should return 100%.', () => {
      const result = getWidth(undefined);
      expect(result).toBe('100%');
    });
  });
});
