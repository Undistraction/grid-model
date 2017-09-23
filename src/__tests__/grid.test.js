import createGrid, {
  INVALID_PARAMS_MESSAGE,
  INVALID_CELL_LOCATION_MESSAGE,
  INVALID_CELL_INDEX_MESSAGE,
  INVALID_COLUMN_INDEX_MESSAGE,
  INVALID_ROW_INDEX_MESSAGE,
  CONFLICTING_PARAMS_MESSAGE,
  ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE,
} from '../grid';

describe('grid', () => {
  describe('invalid params', () => {
    describe('Not enough params supplied to derive a valid grid', () => {
      const invalidParamCombinations = [
        {},
        { width: 100, height: 200 },
        { rows: 10, columns: 20 },
        { cellWidth: 100, cellHeight: 20 },
        { width: 100, columns: 3, cellHeight: 30 },
        { height: 100, rows: 3, cellWidth: 30 },
        { width: 100, height: 40, gutter: 30 },
        { width: 100, height: 40, gutterWidth: 30 },
        { width: 100, height: 40, gutterHeight: 30 },
        { rows: 16, columns: 6, cellWidth: 49 },
        { rows: 16, columns: 6, cellHeight: 49 },
        { rows: 16, columns: 6, gutter: 10 },
        { rows: 16, columns: 6, gutterWidth: 10 },
        { rows: 16, columns: 6, gutterHeight: 10 },
      ];

      for (const params of invalidParamCombinations) {
        expect(() => createGrid(params)).toThrowError(INVALID_PARAMS_MESSAGE);
      }
    });

    describe('cellWidth and columns that will exceed explicit width', () => {
      it('throws an error', () => {
        expect(() =>
          createGrid({
            width: 100,
            height: 200,
            columns: 3,
            rows: 5,
            cellWidth: 40,
          })
        ).toThrowError(CONFLICTING_PARAMS_MESSAGE);
      });
    });

    describe('cellHeight and rows that will exceed explicit height', () => {
      it('throws an error', () => {
        expect(() =>
          createGrid({
            width: 100,
            height: 200,
            columns: 3,
            rows: 5,
            cellHeight: 50,
          })
        ).toThrowError(CONFLICTING_PARAMS_MESSAGE);
      });
    });

    describe('with cellDimensions that conflict with dimensions and grid dimensions', () => {
      it('throws errror', () => {
        expect(() =>
          createGrid({
            width: 500,
            height: 700,
            columns: 5,
            rows: 14,
            cellWidth: 20,
            cellHeight: 44,
            gutter: 250,
          })
        ).toThrowError(CONFLICTING_PARAMS_MESSAGE);
      });
    });

    describe('with column value of zero', () => {
      it('throws errror', () => {
        expect(() =>
          createGrid({
            width: 500,
            height: 700,
            columns: 0,
            rows: 14,
          })
        ).toThrowError(ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE);
      });
    });
  });

  describe('valid', () => {
    describe('supplying width and height', () => {
      it('calculates correct aspectRatio', () => {
        const instance = createGrid({
          width: 100,
          height: 200,
          columns: 5,
          rows: 8,
        });
        expect(instance.width).toEqual(100);
        expect(instance.height).toEqual(200);
        expect(instance.aspectRatio).toEqual(0.5);
        const { dimensions } = instance;
        expect(dimensions.width).toEqual(100);
        expect(dimensions.height).toEqual(200);
        expect(instance.aspectRatio).toEqual(0.5);
      });
    });

    describe('supplying width and aspectRatio', () => {
      it('calculates correct height', () => {
        const instance = createGrid({
          width: 100,
          aspectRatio: 0.5,
          columns: 5,
          rows: 8,
        });
        expect(instance.width).toEqual(100);
        expect(instance.aspectRatio).toEqual(0.5);
        expect(instance.height).toEqual(200);
        const { dimensions } = instance;
        expect(dimensions.width).toEqual(100);
        expect(dimensions.aspectRatio).toEqual(0.5);
        expect(dimensions.height).toEqual(200);
      });
    });

    describe('supplying height and aspectRatio', () => {
      it('calculates correct width', () => {
        const instance = createGrid({
          height: 100,
          aspectRatio: 0.5,
          columns: 5,
          rows: 8,
        });
        expect(instance.height).toEqual(100);
        expect(instance.aspectRatio).toEqual(0.5);
        expect(instance.width).toEqual(50);
        const { dimensions } = instance;
        expect(dimensions.height).toEqual(100);
        expect(dimensions.aspectRatio).toEqual(0.5);
        expect(dimensions.width).toEqual(50);
      });
    });
  });

  describe('rows and columns', () => {
    it('can be configured with rows and columns', () => {
      const instance = createGrid({
        width: 100,
        height: 400,
        columns: 20,
        rows: 30,
      });
      expect(instance.columns).toEqual(20);
      expect(instance.rows).toEqual(30);
      const { gridDimensions } = instance;
      expect(gridDimensions.width).toEqual(20);
      expect(gridDimensions.height).toEqual(30);
    });
  });

  describe('cell dimensions', () => {
    it('can be configured with cell dimensions', () => {
      const instance = createGrid({
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
      const instance = createGrid({
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
    const instance = createGrid({
      width: 100,
      height: 200,
      columns: 10,
      rows: 4,
      gutter: 20,
    });
    expect(instance.gutterWidth).toEqual(20);
    expect(instance.gutterHeight).toEqual(20);
  });

  describe('single cell grid', () => {
    describe('valid dimensions and gridDimensions', () => {
      it('derives a single cell grid', () => {
        const instance = createGrid({
          width: 100,
          height: 200,
          columns: 1,
          rows: 1,
        });
        expect(instance.cellWidth).toEqual(100);
        expect(instance.cellHeight).toEqual(200);
      });
    });

    describe('dimensions and cellDimensions', () => {
      it('derives a single cell grid', () => {
        const instance = createGrid({
          width: 100,
          height: 200,
          cellWidth: 100,
          cellHeight: 200,
        });
        expect(instance.columns).toEqual(1);
        expect(instance.rows).toEqual(1);
      });
    });

    describe('dimensions and gridDimensions with gutter', () => {
      // Gutter value shouldn't effect cellWidth or cellHeight of single row / column grid
      it("gutter doesn't effect cellWiidth or cellHeight", () => {
        const instance = createGrid({
          width: 100,
          height: 200,
          columns: 1,
          rows: 1,
          gutter: 10,
        });
        expect(instance.width).toEqual(100);
        expect(instance.height).toEqual(200);
        expect(instance.cellWidth).toEqual(100);
        expect(instance.cellHeight).toEqual(200);
      });
    });
  });

  describe('combinations', () => {
    describe('valid', () => {
      describe('with dimensions and grid dimensions', () => {
        it('calculates cellWidth, cellHeight and sets gutters to 0', () => {
          const instance = createGrid({
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

      describe('with dimensions, grid dimensions and gutters', () => {
        it('calculates cellWidth and cellHeight', () => {
          const instance = createGrid({
            width: 500,
            height: 700,
            columns: 5,
            rows: 14,
            gutter: 20,
          });
          expect(instance.cellWidth).toEqual(84);
          expect(instance.cellHeight).toBeCloseTo(31.42857, 4);
          expect(instance.gutterWidth).toEqual(20);
          expect(instance.gutterHeight).toEqual(20);
        });
      });

      describe('with dimensions, grid dimensions and cellDimensions', () => {
        const instance = createGrid({
          width: 500,
          height: 707,
          columns: 5,
          rows: 14,
          cellWidth: 20,
          cellHeight: 44,
        });

        it('calcualtes the gutter width', () => {
          expect(instance.cellWidth).toEqual(20);
          expect(instance.cellHeight).toBeCloseTo(44, 4);
          expect(instance.gutterWidth).toEqual(100);
          expect(instance.gutterHeight).toEqual(7);
        });
      });

      describe('with dimensions, grid dimensions, gutters and cellDimensions', () => {
        it('calculates cellWidth and cellHeight', () => {
          const instance = createGrid({
            width: 500,
            height: 706,
            columns: 5,
            cellHeight: 46,
            cellWdith: 84,
            rows: 11,
            gutter: 20,
          });
          expect(instance.cellWidth).toBeCloseTo(84);
          expect(instance.cellHeight).toBeCloseTo(46);
          expect(instance.gutterWidth).toBeCloseTo(20, 4);
          expect(instance.gutterHeight).toBeCloseTo(20, 4);
        });
      });

      describe('with dimensions and cell dimensions', () => {
        describe('that leave no remaining space for gutters', () => {
          it('calculates rows and columns', () => {
            const instance = createGrid({
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

        describe('that leave space for gutters', () => {
          it('calculates rows, columns and gutters', () => {
            const instance = createGrid({
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
      });

      describe('with grid dimensions and cell dimensions', () => {
        it('calculates dimensions', () => {
          const instance = createGrid({
            cellWidth: 100,
            cellHeight: 50,
            rows: 5,
            columns: 10,
          });
          expect(instance.width).toEqual(1000);
          expect(instance.height).toEqual(250);
          expect(instance.gutterWidth).toEqual(0);
          expect(instance.gutterHeight).toEqual(0);
        });
      });

      describe('with grid dimensions, cell dimensions and gutters', () => {
        it('calculates dimensions', () => {
          const instance = createGrid({
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
    });
  });

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  describe('api', () => {
    describe('cellCount', () => {
      it('returns the correct number of cells', () => {
        expect(
          createGrid({
            width: 100,
            height: 300,
            columns: 12,
            rows: 13,
          }).cellCount()
        ).toBe(156);
      });
    });

    describe('regionForCellAt', () => {
      describe('with invalid params', () => {
        it('throws an error', () => {
          const instance = createGrid({
            width: 100,
            height: 300,
            columns: 12,
            rows: 13,
          });
          expect(() => instance.regionForCellAt()).toThrowError(
            INVALID_CELL_LOCATION_MESSAGE
          );

          expect(() => instance.regionForCellAt(11)).toThrowError(
            INVALID_CELL_LOCATION_MESSAGE
          );

          expect(() => instance.regionForCellAt('sss', 33)).toThrowError(
            INVALID_CELL_LOCATION_MESSAGE
          );

          expect(() => instance.regionForCellAt(33, 'sss')).toThrowError(
            INVALID_CELL_LOCATION_MESSAGE
          );
        });
      });

      describe('with an invalid vertical index', () => {
        it('throws and error', () => {
          expect(() =>
            createGrid({
              width: 100,
              height: 300,
              columns: 12,
              rows: 13,
            }).regionForCellAt(3, 15)
          ).toThrowError(INVALID_CELL_INDEX_MESSAGE);
        });
      });

      describe('with an invalid horizontal index', () => {
        it('throws and error', () => {
          expect(() =>
            createGrid({
              width: 100,
              height: 300,
              columns: 12,
              rows: 13,
            }).regionForCellAt(22, 5)
          ).toThrowError(INVALID_CELL_INDEX_MESSAGE);
        });
      });

      describe('with valid indexes', () => {
        it('returns a cell at the correct position and with the correct dimensions', () => {
          const instance = createGrid({
            width: 100,
            height: 300,
            columns: 12,
            rows: 13,
            gutter: 1,
          });

          const cell = instance.regionForCellAt(5, 12);
          const { topLeftPoint } = cell;
          const { dimensions } = cell;

          expect(topLeftPoint.x).toBeCloseTo(42.083333, 4);
          expect(topLeftPoint.y).toBeCloseTo(277.84615, 4);
          expect(dimensions.width).toBeCloseTo(7.41666, 4);
          expect(dimensions.height).toBeCloseTo(22.15384, 4);
        });
      });

      describe('regionForCells', () => {});

      describe('regionForColumns', () => {
        describe('with an invalid start index', () => {
          it('throws an error', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 12,
              rows: 13,
            });

            const invalidParams = [null, '4', 13, -4];

            for (const param of invalidParams) {
              expect(() => instance.regionForColumns(param)).toThrowError(
                INVALID_COLUMN_INDEX_MESSAGE
              );
            }
          });
        });

        describe('with an invalid end index', () => {
          it('throws an error', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 12,
              rows: 13,
            });

            const invalidParams = ['4', 13, -4];

            for (const param of invalidParams) {
              expect(() => instance.regionForColumns(2, param)).toThrowError(
                INVALID_COLUMN_INDEX_MESSAGE
              );
            }
          });
        });

        describe('with a valid start column index', () => {
          it('returns the region of that column', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 10,
              rows: 10,
            });

            const columnRegion = instance.regionForColumns(3);
            const { topLeftPoint, dimensions } = columnRegion;

            expect(topLeftPoint.x).toEqual(30);
            expect(topLeftPoint.y).toEqual(0);
            expect(dimensions.width).toEqual(10);
            expect(dimensions.height).toEqual(300);
          });
        });

        describe('with a valid start and end column index', () => {
          it('returns a region spanning those regions', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 10,
              rows: 10,
            });

            const columnRegion = instance.regionForColumns(2, 9);
            const { topLeftPoint, dimensions } = columnRegion;

            expect(topLeftPoint.x).toEqual(20);
            expect(topLeftPoint.y).toEqual(0);
            expect(dimensions.width).toEqual(80);
            expect(dimensions.height).toEqual(300);
          });
        });
      });

      describe('regionForRows', () => {
        describe('with an invalid start index', () => {
          it('throws an error', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 10,
              rows: 10,
            });

            const invalidParams = [null, '2', 11, -4];

            for (const param of invalidParams) {
              expect(() => instance.regionForRows(param)).toThrowError(
                INVALID_ROW_INDEX_MESSAGE
              );
            }
          });
        });

        describe('with an invalid end index', () => {
          it('throws an error', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 10,
              rows: 10,
            });

            const invalidParams = ['4', 15, -4];

            for (const param of invalidParams) {
              expect(() => instance.regionForRows(2, param)).toThrowError(
                INVALID_ROW_INDEX_MESSAGE
              );
            }
          });
        });

        describe('with a valid row index', () => {
          it('returns the region of that column', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 10,
              rows: 10,
            });

            const columnRegion = instance.regionForRows(3);
            const { topLeftPoint, dimensions } = columnRegion;

            expect(topLeftPoint.x).toEqual(0);
            expect(topLeftPoint.y).toEqual(90);
            expect(dimensions.width).toEqual(100);
            expect(dimensions.height).toEqual(30);
          });
        });

        describe('with a valid start and end column index', () => {
          it('returns a region spanning those regions', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 10,
              rows: 10,
            });

            const columnRegion = instance.regionForRows(2, 9);
            const { topLeftPoint, dimensions } = columnRegion;

            expect(topLeftPoint.x).toEqual(0);
            expect(topLeftPoint.y).toEqual(60);
            expect(dimensions.width).toEqual(100);
            expect(dimensions.height).toEqual(240);
          });
        });
      });

      describe('getIterator', () => {
        it('returns an iterator', () => {
          const instance = createGrid({
            width: 100,
            height: 200,
            columns: 5,
            rows: 8,
          });

          const cell = instance.getIterator().next().value;

          expect(cell.topLeftPoint.x).toEqual(0);
          expect(cell.topLeftPoint.y).toEqual(0);
        });
      });
    });
  });
});
