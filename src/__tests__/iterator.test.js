import _ from 'lodash';
import createIterator, { MISSING_GRID_MESSAGE } from '../iterator';
import createGrid from '../grid';

const times = x => f => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

describe('iterator', () => {
  describe('without a grid', () => {
    it('throws and error called without a grid', () => {
      expect(() => createIterator()).toThrowError(MISSING_GRID_MESSAGE);
    });
  });

  describe('with a grid', () => {
    it('iterates through each cell', () => {
      const gridInstance = createGrid({
        width: 100,
        height: 200,
        columns: 10,
        rows: 12,
      });
      const instance = createIterator(gridInstance);
      // 120 cells
      _.times(120, () => {
        expect(instance.next().done).toBeFalsy();
      });
      expect(instance.next().done).toBeTruthy();
    });
  });
});
