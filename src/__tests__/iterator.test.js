import _ from 'lodash-es';
import createIterator, { MISSING_GRID_MESSAGE } from '../iterator';
import createRegion from '../region';
import createDimensions from '../dimensions';
import createPoint from '../point';
import createGrid from '../grid';

const times = x => f => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

const createCellAt = (x, y, width, height) => {
  return createRegion(createPoint(x, y), createDimensions({ width, height }));
};

describe('iterator', () => {
  describe('without a grid', () => {
    it('throws and error called without a grid', () => {
      expect(() => createIterator()).toThrowError(MISSING_GRID_MESSAGE);
    });
  });

  describe('with a grid', () => {
    it('iterates through each cell in the correct order', () => {
      const cellWidth = 10;
      const cellHeight = 20;
      const gridInstance = createGrid({
        width: 30,
        height: 40,
        cellWidth,
        cellHeight,
      });

      const expectedCells = [
        createCellAt(0, 0, cellWidth, cellHeight),
        createCellAt(10, 0, cellWidth, cellHeight),
        createCellAt(20, 0, cellWidth, cellHeight),
        createCellAt(0, 20, cellWidth, cellHeight),
        createCellAt(10, 20, cellWidth, cellHeight),
        createCellAt(20, 20, cellWidth, cellHeight),
      ];

      const instance = createIterator(gridInstance);

      let i = 0;
      // 120 cells
      _.times(6, () => {
        const expectedCell = expectedCells[i];
        i += 1;
        const result = instance.next();
        const region = result.value;
        expect(region.topLeftPoint.x).toEqual(expectedCell.topLeftPoint.x);
        expect(region.topLeftPoint.y).toEqual(expectedCell.topLeftPoint.y);
        expect(region.bottomRightPoint.x).toEqual(
          expectedCell.bottomRightPoint.x
        );
        expect(region.bottomRightPoint.y).toEqual(
          expectedCell.bottomRightPoint.y
        );
        expect(result.done).toBeFalsy();
      });
      expect(instance.next().done).toBeTruthy();
    });
  });
});
