import createGrid from '../../grid';
import {
  linearHorizontalForwardIterator,
  linearHorizontalBackwardIterator,
  linearVerticalForwardIterator,
  linearVerticalBackwardIterator,
} from '../../iterators/linear';

describe('linear', () => {
  describe('linearHorizontalForwardIterator', () => {
    it('should iterate through the cells in the correct order', () => {
      const grid = createGrid({ width: 100, height: 100, columns: 3, rows: 2 });
      const iterator = linearHorizontalForwardIterator(grid);
      const expectedIndexes = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
      let i = 0;
      for (const value of iterator) {
        expect(value).toEqual(expectedIndexes[i]);
        i += 1;
      }
    });
  });

  describe('linearHorizontalBackwardIterator', () => {
    it('should iterate through the cells in the correct order', () => {
      const grid = createGrid({ width: 100, height: 100, columns: 3, rows: 2 });
      const iterator = linearHorizontalBackwardIterator(grid);
      const expectedIndexes = [[2, 1], [1, 1], [0, 1], [2, 0], [1, 0], [0, 0]];
      let i = 0;
      for (const value of iterator) {
        expect(value).toEqual(expectedIndexes[i]);
        i += 1;
      }
    });
  });

  describe('linearVerticalForwardIterator', () => {
    it('should iterate through the cells in the correct order', () => {
      const grid = createGrid({ width: 100, height: 100, columns: 3, rows: 2 });
      const iterator = linearVerticalForwardIterator(grid);
      const expectedIndexes = [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1]];
      let i = 0;
      for (const value of iterator) {
        expect(value).toEqual(expectedIndexes[i]);
        i += 1;
      }
    });
  });

  describe('linearVerticalBackwardIterator', () => {
    it('should iterate through the cells in the correct order', () => {
      const grid = createGrid({ width: 100, height: 100, columns: 3, rows: 2 });
      const iterator = linearVerticalBackwardIterator(grid);
      const expectedIndexes = [[2, 1], [2, 0], [1, 1], [1, 0], [0, 1], [0, 0]];
      let i = 0;
      for (const value of iterator) {
        expect(value).toEqual(expectedIndexes[i]);
        i += 1;
      }
    });
  });
});
