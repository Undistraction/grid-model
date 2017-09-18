import grid, {
  INVALID_PARAMS_MESSAGE,
  INVALID_PARAMS_TO_CELL_AT_MESSAGE,
  INVALID_CELL_INDEX_MESSAGE,
} from '../grid';

describe('grid', () => {
  describe('invalid params', () => {
    describe('with only valid dimensions', () => {
      it('throws an error', () => {
        expect(() => grid({ width: 100, height: 200 })).toThrowError(
          INVALID_PARAMS_MESSAGE
        );
      });
    });

    describe('with cellWidth that will exceed grid width at supplied columns', () => {
      it('throws an error', () => {
        expect(() =>
          grid({ width: 100, height: 200, columns: 3, rows: 5, cellWidth: 40 })
        ).toThrowError(INVALID_PARAMS_MESSAGE);
      });
    });

    describe('with cellHeight that will exceed grid height at supplied columns', () => {
      it('throws an error', () => {
        expect(() =>
          grid({ width: 100, height: 200, columns: 3, rows: 5, cellHeight: 50 })
        ).toThrowError(INVALID_PARAMS_MESSAGE);
      });
    });
  });

  describe('dimensions', () => {
    describe('using width and height for dimensions', () => {
      it('calculates returns the correct width and height', () => {
        const instance = grid({ width: 100, height: 200, columns: 5, rows: 8 });
        expect(instance.width).toEqual(100);
        expect(instance.height).toEqual(200);
        const dimensions = instance.dimensions;
        expect(dimensions.width).toEqual(100);
        expect(dimensions.height).toEqual(200);
      });

      it('calculates correct aspect ratio', () => {
        const instance = grid({ width: 100, height: 200, columns: 5, rows: 8 });
        expect(instance.aspectRatio).toEqual(0.5); // 100 / 200
      });
    });

    describe('using width and aspaectRatio for dimensions', () => {
      it('returns the correct width and aspectRatio', () => {
        const instance = grid({
          width: 100,
          aspectRatio: 0.5,
          columns: 5,
          rows: 8,
        });
        expect(instance.width).toEqual(100);
        expect(instance.aspectRatio).toEqual(0.5);
        const { dimensions } = instance;
        expect(dimensions.width).toEqual(100);
        expect(dimensions.aspectRatio).toEqual(0.5);
      });

      it('calculates correct height', () => {
        const instance = grid({
          width: 100,
          aspectRatio: 0.5,
          columns: 5,
          rows: 8,
        });
        expect(instance.height).toEqual(200);
        const { dimensions } = instance;
        expect(dimensions.height).toEqual(200);
      });
    });

    describe('using height and aspaectRatio for dimensions', () => {
      it('returns the correct height and aspectRatio', () => {
        const instance = grid({
          height: 100,
          aspectRatio: 0.5,
          columns: 5,
          rows: 8,
        });
        expect(instance.height).toEqual(100);
        expect(instance.aspectRatio).toEqual(0.5);
        const { dimensions } = instance;
        expect(dimensions.height).toEqual(100);
        expect(dimensions.aspectRatio).toEqual(0.5);
      });

      it('calculates correct width', () => {
        const instance = grid({
          height: 100,
          aspectRatio: 0.5,
          columns: 5,
          rows: 8,
        });
        expect(instance.width).toEqual(50);
        const { dimensions } = instance;
        expect(dimensions.width).toEqual(50);
      });
    });
  });

  describe('rows and columns', () => {
    it('can be configured with rows and columns', () => {
      const instance = grid({ width: 100, height: 400, columns: 20, rows: 30 });
      expect(instance.columns).toEqual(20);
      expect(instance.rows).toEqual(30);
      const { gridDimensions } = instance;
      expect(gridDimensions.width).toEqual(20);
      expect(gridDimensions.height).toEqual(30);
    });
  });

  describe('cell dimensions', () => {
    it('can be configured with cell dimensions', () => {
      const instance = grid({
        width: 100,
        height: 400,
        cellWidth: 20,
        cellHeight: 30,
      });
      expect(instance.cellWidth).toEqual(20);
      expect(instance.cellHeight).toEqual(30);
      const { cellDimensions } = instance;
      expect(cellDimensions.width).toEqual(20);
      expect(cellDimensions.height).toEqual(30);
    });
  });

  describe('gutter dimensions', () => {
    it('can be configured with individual gutter dimensions', () => {
      const instance = grid({
        width: 100,
        height: 200,
        columns: 10,
        rows: 4,
        gutterWidth: 20,
        gutterHeight: 30,
      });
      expect(instance.gutterWidth).toEqual(20);
      expect(instance.gutterHeight).toEqual(30);
    });
  });

  it('can be configured with a single gutter dimension', () => {
    const instance = grid({
      width: 100,
      height: 200,
      columns: 10,
      rows: 4,
      gutter: 20,
    });
    expect(instance.gutterWidth).toEqual(20);
    expect(instance.gutterHeight).toEqual(20);
  });

  describe('combinations', () => {
    describe('valid dimensions with columns and rows', () => {
      it('calculates cellWidth, cellHeight and sets gutters to 0', () => {
        const instance = grid({
          width: 500,
          height: 700,
          columns: 5,
          rows: 14,
        });
        expect(instance.cellWidth).toEqual(100);
        expect(instance.cellHeight).toEqual(50);
        expect(instance.gutterWidth).toEqual(0);
        expect(instance.gutterHeight).toEqual(0);
      });
    });

    describe('with no dimenions', () => {
      describe('with columns, rows and cell dimensions', () => {
        it('calculates dimensions', () => {
          const instance = grid({
            cellWidth: 100,
            cellHeight: 50,
            rows: 5,
            columns: 10,
          });
          expect(instance.width).toEqual(1000);
          expect(instance.height).toEqual(250);
        });
      });

      describe('with columns, rows, cell dimensions and gutters', () => {
        it('calculates dimensions', () => {
          const instance = grid({
            cellWidth: 100,
            cellHeight: 50,
            rows: 5,
            columns: 10,
            gutter: 10,
          });
          expect(instance.width).toEqual(1090);
          expect(instance.height).toEqual(290);
        });
      });

      describe('valid dimensions with valid cellWidth and cellHeight', () => {
        describe('with cells that exactly fit without gutterspace', () => {
          it('calculates rows and columns', () => {
            const instance = grid({
              width: 500,
              height: 700,
              cellWidth: 100,
              cellHeight: 50,
            });
            expect(instance.columns).toEqual(5);
            expect(instance.rows).toEqual(14);
            expect(instance.gutterWidth).toEqual(0);
            expect(instance.gutterHeight).toEqual(0);
          });
        });
      });

      describe('with cells that leave gutterspace', () => {
        it('calculates rows, columns and gutters', () => {
          const instance = grid({
            width: 500, //
            height: 700,
            cellWidth: 70,
            cellHeight: 60,
          });
          expect(instance.columns).toEqual(7);
          expect(instance.rows).toEqual(11);
          expect(instance.gutterWidth).toBeCloseTo(1.66666, 4);
          expect(instance.gutterHeight).toEqual(4);
        });
      });

      describe('with dimensions, columns, rows, valid cellWidth and valid cellHeight', () => {
        it('calculates gutters', () => {
          const instance = grid({
            columns: 10,
            rows: 8,
            cellWidth: 40,
            cellHeight: 85,
          });
          expect(instance.width).toBe(400);
          expect(instance.height).toBe(680);
        });
      });
    });
  });

  describe('api', () => {
    describe('cellCount', () => {
      it('returns the correct number of cells', () => {
        expect(
          grid({ width: 100, height: 300, columns: 12, rows: 13 }).cellCount()
        ).toBe(156);
      });
    });

    describe('cellAt', () => {
      describe('with invalid params', () => {
        it('throws an error', () => {
          const instance = grid({
            width: 100,
            height: 300,
            columns: 12,
            rows: 13,
          });
          expect(() => instance.cellAt()).toThrowError(
            INVALID_PARAMS_TO_CELL_AT_MESSAGE
          );

          expect(() => instance.cellAt(11)).toThrowError(
            INVALID_PARAMS_TO_CELL_AT_MESSAGE
          );

          expect(() => instance.cellAt('sss', 33)).toThrowError(
            INVALID_PARAMS_TO_CELL_AT_MESSAGE
          );

          expect(() => instance.cellAt(33, 'sss')).toThrowError(
            INVALID_PARAMS_TO_CELL_AT_MESSAGE
          );
        });
      });

      describe('with an invalid vertical index', () => {
        it('throws and error', () => {
          expect(() =>
            grid({ width: 100, height: 300, columns: 12, rows: 13 }).cellAt(
              3,
              15
            )
          ).toThrowError(INVALID_CELL_INDEX_MESSAGE);
        });
      });

      describe('with an invalid horizontal index', () => {
        it('throws and error', () => {
          expect(() =>
            grid({ width: 100, height: 300, columns: 12, rows: 13 }).cellAt(
              22,
              5
            )
          ).toThrowError(INVALID_CELL_INDEX_MESSAGE);
        });
      });

      describe('with valid indexes', () => {
        it('returns the right cell', () => {
          const instance = grid({
            width: 100,
            height: 300,
            columns: 12,
            rows: 13,
            gutter: 1,
          });

          const cell = instance.cellAt(5, 12);
          const { point } = cell;
          // const { dimensions } = cell;

          expect(point.x).toBeCloseTo(42.083333, 4);
          expect(point.y).toBeCloseTo(277.84615, 4);
        });
      });
    });
  });
});
