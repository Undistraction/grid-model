import createIterator, {
  MISSING_GRID_MESSAGE,
  MISSING_STRATEGY_MESSAGE,
} from '../iterator';
import { linearHorizontalForwardIterator } from '../iterators/linear';
import createGrid from '../grid';

describe('iterator', () => {
  describe('without a strategy', () => {
    it('throws and error', () => {
      expect(() => createIterator()).toThrowError(MISSING_STRATEGY_MESSAGE);
    });
  });

  describe('with a grid', () => {
    describe('without an iterator strategy', () => {
      it('throws an error', () => {
        expect(() => createIterator({})).toThrowError(MISSING_GRID_MESSAGE);
      });
    });

    it('iterates through each cell in the correct order', () => {
      const gridInstance = createGrid({
        width: 100,
        height: 100,
        columns: 3,
        rows: 2,
      });

      const expectedIndexes = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];

      const instance = linearHorizontalForwardIterator(gridInstance);

      // 120 cells
      for (const expectedIndex of expectedIndexes) {
        const result = instance.next();
        expect(result.done).toBeFalsy();
        expect(result.value).toEqual(expectedIndex);
      }
      expect(instance.next().done).toBeTruthy();
    });
  });
});
