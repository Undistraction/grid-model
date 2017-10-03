import { increment, decrement } from '../math';

describe('math', () => {
  describe('increment', () => {
    it('incrments value by one', () => {
      expect(increment(0)).toEqual(1);
      expect(increment(1)).toEqual(2);
      expect(increment(10)).toEqual(11);
      expect(increment(-1)).toEqual(0);
    });
  });

  describe('decrement', () => {
    it('decrements value by one', () => {
      expect(decrement(0)).toEqual(-1);
      expect(decrement(1)).toEqual(0);
      expect(decrement(10)).toEqual(9);
      expect(decrement(-1)).toEqual(-2);
    });
  });
});
