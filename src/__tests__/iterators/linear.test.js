import createGrid from '../../grid';
import {
  TOP_LEFT_CORNER,
  TOP_RIGHT_CORNER,
  BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER,
  VERTICAL,
  HORIZONTAL,
  linearIterator,
} from '../../iterators/linear';

describe('linear', () => {
  describe('starting in the top-left corner', () => {
    describe('horizontal', () => {
      it('should iterate through the cells in the correct order', () => {
        const grid = createGrid({
          width: 100,
          height: 100,
          columns: 3,
          rows: 2,
        });
        const iterator = linearIterator(TOP_LEFT_CORNER, HORIZONTAL)(grid);
        const expectedIndexes = [
          [0, 0],
          [1, 0],
          [2, 0],
          [0, 1],
          [1, 1],
          [2, 1],
        ];
        let i = 0;
        for (const value of iterator) {
          expect(value).toEqual(expectedIndexes[i]);
          i += 1;
        }
      });
    });

    describe('vertical', () => {
      it('should iterate through the cells in the correct order', () => {
        const grid = createGrid({
          width: 100,
          height: 100,
          columns: 3,
          rows: 2,
        });
        const iterator = linearIterator(TOP_LEFT_CORNER, VERTICAL)(grid);
        const expectedIndexes = [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
          [2, 0],
          [2, 1],
        ];
        let i = 0;
        for (const value of iterator) {
          expect(value).toEqual(expectedIndexes[i]);
          i += 1;
        }
      });
    });
  });

  describe('starting in the top-right corner', () => {
    describe('horizontal', () => {
      it('should iterate through the cells in the correct order', () => {
        const grid = createGrid({
          width: 100,
          height: 100,
          columns: 3,
          rows: 2,
        });
        const iterator = linearIterator(TOP_RIGHT_CORNER, HORIZONTAL)(grid);
        const expectedIndexes = [
          [2, 0],
          [1, 0],
          [0, 0],
          [2, 1],
          [1, 1],
          [0, 1],
        ];
        let i = 0;
        for (const value of iterator) {
          expect(value).toEqual(expectedIndexes[i]);
          i += 1;
        }
      });
    });

    describe('vertical', () => {
      it('should iterate through the cells in the correct order', () => {
        const grid = createGrid({
          width: 100,
          height: 100,
          columns: 3,
          rows: 2,
        });
        const iterator = linearIterator(TOP_RIGHT_CORNER, VERTICAL)(grid);
        const expectedIndexes = [
          [2, 0],
          [2, 1],
          [1, 0],
          [1, 1],
          [0, 0],
          [0, 1],
        ];
        let i = 0;
        for (const value of iterator) {
          expect(value).toEqual(expectedIndexes[i]);
          i += 1;
        }
      });
    });
  });

  describe('starting in the bottom right corner', () => {
    describe('horizontal', () => {
      it('should iterate through the cells in the correct order', () => {
        const grid = createGrid({
          width: 100,
          height: 100,
          columns: 3,
          rows: 2,
        });
        const iterator = linearIterator(BOTTOM_RIGHT_CORNER, HORIZONTAL)(grid);
        const expectedIndexes = [
          [2, 1],
          [1, 1],
          [0, 1],
          [2, 0],
          [1, 0],
          [0, 0],
        ];
        let i = 0;
        for (const value of iterator) {
          expect(value).toEqual(expectedIndexes[i]);
          i += 1;
        }
      });
    });

    describe('vertical', () => {
      it('should iterate through the cells in the correct order', () => {
        const grid = createGrid({
          width: 100,
          height: 100,
          columns: 3,
          rows: 2,
        });
        const iterator = linearIterator(BOTTOM_RIGHT_CORNER, VERTICAL)(grid);
        const expectedIndexes = [
          [2, 1],
          [2, 0],
          [1, 1],
          [1, 0],
          [0, 1],
          [0, 0],
        ];
        let i = 0;
        for (const value of iterator) {
          expect(value).toEqual(expectedIndexes[i]);
          i += 1;
        }
      });
    });
  });

  describe('starting in the bottom left corner', () => {
    describe('horizontal', () => {
      it('should iterate through the cells in the correct order', () => {
        const grid = createGrid({
          width: 100,
          height: 100,
          columns: 3,
          rows: 2,
        });
        const iterator = linearIterator(BOTTOM_LEFT_CORNER, HORIZONTAL)(grid);
        const expectedIndexes = [
          [0, 1],
          [1, 1],
          [2, 1],
          [0, 0],
          [1, 0],
          [2, 0],
        ];
        let i = 0;
        for (const value of iterator) {
          expect(value).toEqual(expectedIndexes[i]);
          i += 1;
        }
      });
    });

    describe('vertical', () => {
      it('should iterate through the cells in the correct order', () => {
        const grid = createGrid({
          width: 100,
          height: 100,
          columns: 3,
          rows: 2,
        });
        const iterator = linearIterator(BOTTOM_LEFT_CORNER, VERTICAL)(grid);
        const expectedIndexes = [
          [0, 1],
          [0, 0],
          [1, 1],
          [1, 0],
          [2, 1],
          [2, 0],
        ];
        let i = 0;
        for (const value of iterator) {
          expect(value).toEqual(expectedIndexes[i]);
          i += 1;
        }
      });
    });
  });
});
