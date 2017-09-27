import createGrid, {
  INVALID_PARAMS_MESSAGE,
  INVALID_COLUMN_INDEX_MESSAGE,
  INVALID_ROW_INDEX_MESSAGE,
  CONFLICTING_PARAMS_MESSAGE,
  ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE,
} from '../grid';

describe('grid', () => {
  // ---------------------------------------------------------------------------
  // createGrid()
  // ---------------------------------------------------------------------------

  describe('createGrid()', () => {
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

      describe('cellDimensions that conflict with dimensions and grid dimensions', () => {
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

      describe('column value of zero', () => {
        it('throws errror', () => {
          expect(() =>
            createGrid({
              width: 500,
              height: 700,
              columns: 0,
              rows: 10,
            })
          ).toThrowError(ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE);
        });
      });

      describe('row value of zero', () => {
        it('throws errror', () => {
          expect(() =>
            createGrid({
              width: 500,
              height: 700,
              columns: 10,
              rows: 0,
            })
          ).toThrowError(ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE);
        });
      });
    });

    describe('valid params', () => {
      describe('dimensions', () => {
        it('can be configured dimensions', () => {
          const instance = createGrid({
            width: 100,
            height: 400,
            columns: 5,
            rows: 10,
          });
          expect(instance.width).toEqual(100);
          expect(instance.height).toEqual(400);
          expect(instance.aspectRatio).toEqual(0.25);
          const { dimensions } = instance;
          expect(dimensions.width).toEqual(100);
          expect(dimensions.height).toEqual(400);
          expect(dimensions.aspectRatio).toEqual(0.25);
        });
      });

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
        });
      });
    });

    it('can be configured with rows and columns', () => {
      const instance = createGrid({
        width: 100,
        height: 400,
        columns: 20,
        rows: 30,
      });
      expect(instance.columns).toEqual(20);
      expect(instance.rows).toEqual(30);
    });

    describe('grid dimensions', () => {
      it('can be configured with grid dimensions', () => {
        const instance = createGrid({
          width: 100,
          height: 400,
          columns: 10,
          rows: 5,
        });
        expect(instance.columns).toEqual(10);
        expect(instance.rows).toEqual(5);
        const { matrixDimensions } = instance;
        expect(matrixDimensions.width).toEqual(10);
        expect(matrixDimensions.height).toEqual(5);
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
        const { gutterDimensions } = instance;
        expect(gutterDimensions.width).toEqual(20);
        expect(gutterDimensions.height).toEqual(30);
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
        const { gutterDimensions } = instance;
        expect(gutterDimensions.width).toEqual(20);
        expect(gutterDimensions.height).toEqual(20);
      });
    });

    describe('single cell grid', () => {
      describe('dimensions and matrixDimensions', () => {
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

      describe('dimensions and matrixDimensions with gutter', () => {
        it("gutter doesn't effect cellWidth or cellHeight", () => {
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
  });

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  describe('api', () => {
    // -------------------------------------------------------------------------
    // cellCount()
    // -------------------------------------------------------------------------

    describe('cellCount()', () => {
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

    // -------------------------------------------------------------------------
    // regionForCellAt()
    // -------------------------------------------------------------------------

    describe('regionForCellAt()', () => {
      describe('with invalid params', () => {
        it('throws an error', () => {
          const instance = createGrid({
            width: 100,
            height: 300,
            columns: 12,
            rows: 13,
          });

          const invalidParams = [
            [null, 6],
            [6, null],
            [-4, 5],
            [4, -3],
            ['4', 4],
            [4, '4'],
          ];

          for (const param of invalidParams) {
            expect(() => instance.regionForCellAt(param, 4, 7)).toThrowError();
          }
        });
      });

      describe('with a column index greater than available columns', () => {
        it('throws and error', () => {
          expect(() =>
            createGrid({
              width: 100,
              height: 300,
              columns: 12,
              rows: 13,
            }).regionForCellAt(15, 4)
          ).toThrowError(INVALID_COLUMN_INDEX_MESSAGE);
        });
      });

      describe('with a row index greater than available rows', () => {
        it('throws and error', () => {
          expect(() =>
            createGrid({
              width: 100,
              height: 300,
              columns: 12,
              rows: 13,
            }).regionForCellAt(4, 15)
          ).toThrowError(INVALID_ROW_INDEX_MESSAGE);
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
          const { topLeftPoint, dimensions } = cell;

          expect(topLeftPoint.x).toBeCloseTo(42.083333, 4);
          expect(topLeftPoint.y).toBeCloseTo(277.84615, 4);
          expect(dimensions.width).toBeCloseTo(7.41666, 4);
          expect(dimensions.height).toBeCloseTo(22.15384, 4);
        });
      });
    });

    // -------------------------------------------------------------------------
    // regionForCellCellsAt()
    // -------------------------------------------------------------------------

    describe('regionForCellsAt()', () => {
      describe('invalid', () => {
        describe('start index', () => {
          it('throws an error', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 12,
              rows: 13,
            });

            const invalidParams = [
              [null, 6],
              [6, null],
              [-4, 5],
              [4, -3],
              ['4', 4],
              [4, '4'],
              [15, 3],
              [4, 20],
            ];

            for (const param of invalidParams) {
              expect(() =>
                instance.regionForCellsAt(...param, 4, 7)
              ).toThrowError();
            }
          });
        });

        describe('end index', () => {
          it('throws an error', () => {
            const instance = createGrid({
              width: 100,
              height: 300,
              columns: 12,
              rows: 13,
            });

            const invalidParams = [
              [null, 6],
              [6, null],
              [-4, 5],
              [4, -3],
              ['4', 4],
              [4, '4'],
              [15, 3],
              [4, 20],
            ];

            for (const param of invalidParams) {
              expect(() =>
                instance.regionForCellsAt(4, 6, ...param)
              ).toThrowError();
            }
          });
        });
      });
      describe('valid', () => {
        describe('start and end indexes', () => {
          describe('in order', () => {
            it('returns the correct region', () => {
              const instance = createGrid({
                width: 100,
                height: 300,
                columns: 12,
                rows: 13,
              });

              const region = instance.regionForCellsAt(0, 0, 11, 12);

              const { topLeftPoint, dimensions } = region;

              expect(topLeftPoint.x).toEqual(0);
              expect(topLeftPoint.y).toEqual(0);
              expect(dimensions.width).toEqual(100);
              expect(dimensions.height).toEqual(300);
            });
          });

          describe('out of order', () => {
            it('returns the correct region', () => {
              const instance = createGrid({
                width: 100,
                height: 300,
                columns: 12,
                rows: 13,
              });

              const region = instance.regionForCellsAt(11, 12, 0, 0);
              const { topLeftPoint, dimensions } = region;

              expect(topLeftPoint.x).toEqual(0);
              expect(topLeftPoint.y).toEqual(0);
              expect(dimensions.width).toEqual(100);
              expect(dimensions.height).toEqual(300);
            });
          });
        });
      });
    });

    // -------------------------------------------------------------------------
    // regionForColumns()
    // -------------------------------------------------------------------------

    describe('regionForColumns()', () => {
      describe('invalid', () => {
        describe('start index', () => {
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

        describe('end index', () => {
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
      });
      describe('valid', () => {
        describe('start column index', () => {
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
        describe('start and end column indexes', () => {
          describe('in order', () => {
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

          describe('out of order', () => {
            it('returns a region spanning those regions', () => {
              const instance = createGrid({
                width: 100,
                height: 300,
                columns: 10,
                rows: 10,
              });

              const columnRegion = instance.regionForColumns(9, 2);
              const { topLeftPoint, dimensions } = columnRegion;

              expect(topLeftPoint.x).toEqual(20);
              expect(topLeftPoint.y).toEqual(0);
              expect(dimensions.width).toEqual(80);
              expect(dimensions.height).toEqual(300);
            });
          });
        });
      });
    });

    // -------------------------------------------------------------------------
    // regionForRows()
    // -------------------------------------------------------------------------

    describe('regionForRows()', () => {
      describe('invalid', () => {
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
      });

      describe('valid', () => {
        describe('single row index', () => {
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

        describe('start and end row indexes', () => {
          describe('indexes in order', () => {
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

          describe('indexes out of order', () => {
            it('returns a region spanning those regions', () => {
              const instance = createGrid({
                width: 100,
                height: 300,
                columns: 10,
                rows: 10,
              });

              const columnRegion = instance.regionForRows(9, 2);
              const { topLeftPoint, dimensions } = columnRegion;

              expect(topLeftPoint.x).toEqual(0);
              expect(topLeftPoint.y).toEqual(60);
              expect(dimensions.width).toEqual(100);
              expect(dimensions.height).toEqual(240);
            });
          });
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

        const firstCellIndexes = instance.getIterator().next().value;
        const firstCell = instance.regionForCellAt(...firstCellIndexes);

        expect(firstCell.topLeftPoint.x).toEqual(0);
        expect(firstCell.topLeftPoint.y).toEqual(0);
      });
    });
  });
});
