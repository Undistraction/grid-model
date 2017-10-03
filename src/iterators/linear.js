import { curry } from 'lodash';
import { increment, decrement } from '../math';
import createIterator from '../iterator';

/**
 * The top left corner cell of the grid.
 */
export const TOP_LEFT_CORNER = 'tl';

/**
 * The top right corner cell of the grid.
 */
export const TOP_RIGHT_CORNER = 'tr';

/**
 * The bottom right corner cell of the grid.
 */
export const BOTTOM_RIGHT_CORNER = 'br';

/**
 * The bottom left corner cell of the grid.
 */
export const BOTTOM_LEFT_CORNER = 'bl';

/**
 * Vertical direction.
 */
export const VERTICAL = 'vertical';

/**
 * Horizontal direction.
 */
export const HORIZONTAL = 'horizontal';
/**
 * {number} The index of the first column in the grid. This will always be zero
 * as column indexes are zero-based.
 * 
 * @return {number} The index of the first column in the grid.
 * @private
 */
const firstColumn = () => 0;

/**
 * Get the index of the last column in the grid. This will always be one less
 * than the total number of columns because column indexes are zero-based.
 * 
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {number} Zero-based version of total number of columns.
 * @private
 */
const lastColumn = totalColumns => totalColumns - 1;

/**
 * Get the index of the first row in the grid. This will always be
 * zero as row indexes are zero-based.
 * 
 * @return {number} The index of the first row in the grid.
 * @private
 */
const firstRow = () => 0;

/**
 * Get the index of the last row in the grid. This will always be one less
 * than the total number of rows because row indexes are zero-based.
 * 
 * @param {number} totalRows The total number of rows.
 * 
 * @returns {number} Zero-based version of total number of rows.
 * @private
 */
const lastRow = totalRows => totalRows - 1;

/**
 * Get the indexes of the top left cell in the grid. This will always be [0,0]
 * because column and row indexes are zero-based.
 * 
 * @returns {array} An array containing the column and row indexes of the top left cell.
 * @private
 */
const topLeftCell = () => [firstColumn(), firstRow()];

/**
 * Get the indexes of the top right cell in the grid. This will always be
 * [totalColumns -1,0] because column and row indexes are zero-based.
 * 
 * @param {any} totalColumns The total number of columns.
 * 
 * @returns {array} An array containing the column and row indexes of the top
 * right cell.
 * @private
 */
const topRightCell = totalColumns => [lastColumn(totalColumns), firstRow()];

/**
 * Get the indexes of the bottom right cell in the grid. This will always be
 * [totalColumns -1, totalRows -1] because the column and row indexes are zero
 * based.
 * 
 * @param {any} totalColumns The total number of columns.
 * @param {any} totalRows The totoal number of rows.
 * 
 * @returns {array} An array containing the column and row indeses of the
 * bottom-right cell.
 * @private
 */
const bottomRightCell = (totalColumns, totalRows) => [
  lastColumn(totalColumns),
  lastRow(totalRows),
];

/**
 * Get the indexes of the bottom left cell in the grid. This will always be
 * [totalColumns -1, totalRows -1] because the column and row indexes are zero
 * based.
 * 
 * @param {any} totalColumns The totoal number of columns.
 * @param {any} totalRows The totoal number of rows.
 * 
 * @returns {array} An array containing the column and row indeses of the
 * bottom-left cell.
 * @private
 */
const bottomLeftCell = (totalColumns, totalRows) => [
  firstColumn(),
  lastRow(totalRows),
];

/**
 * Get the indexes of cell to the right of the one with the supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of cell to the right.
 * @private
 */
const cellToRight = (columnIndex, rowIndex) => [
  increment(columnIndex),
  rowIndex,
];

/**
 * Get the indexes of cell to the left of the one with the supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of cell to the left.
 * @private
 */
const cellToLeft = (columnIndex, rowIndex) => [
  decrement(columnIndex),
  rowIndex,
];

/**
 * Get the indexes of cell below the one with the supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of cell below.
 * @private
 */
const cellBelow = (columnIndex, rowIndex) => [columnIndex, increment(rowIndex)];

/**
 * Get the indexes of cell above the one with the supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of cell above.
 * @private
 */
const cellAbove = (columnIndex, rowIndex) => [columnIndex, decrement(rowIndex)];

/**
 * Get the indexes of first cell in the next column to the one with the supplied
 * indexes.
 * 
 * @param {number} columnIndex The column index.
 * 
 * @returns {array} The indexes of first cell in the next column to the on with
 * the supplied index.
 * @private
 */
const firstCellOfNextColumn = columnIndex => [
  increment(columnIndex),
  firstRow(),
];

/**
 * Get the indexes of first cell in the previous column to the one with the
 * supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * 
 * @returns {array} The indexes of first cell in the previous column to the one
 * with the supplied index.
 * @private
 */
// eslint-disable-next-line no-unused-vars
const firstCellOfPreviousColumn = columnIndex => [
  decrement(columnIndex),
  firstRow(),
];

/**
 * Get the indexes of last cell in the next column to the one with the supplied
 * indexes.
 * 
 * @param {number} columnIndex The column index.
 * 
 * @returns {array} The indexes of last cell in the next column to the on with
 * the supplied index.
 * @private
 */
// eslint-disable-next-line no-unused-vars
const lastCellOfNextColumn = (columnIndex, totalRows) => [
  increment(columnIndex),
  lastRow(totalRows),
];

/**
 * Get the indexes of last cell in the row above the row with the supplied
 * index.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} totalRows The total number of rows.
 * 
 * @returns {array} The indexes of last cell in previous column to the one with
 * the supplied index.
 * @private
 */
const lastCellOfPreviousColumn = (columnIndex, totalRows) => [
  decrement(columnIndex),
  lastRow(totalRows),
];

/**
 * Get the indexes of first cell in the row below the row with the supplied
 * index.
 * 
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of first cell in the row below the one with the
 * supplied index.
 * @private
 */
const firstCellOfRowBelow = rowIndex => [firstColumn(), increment(rowIndex)];

/**
 * Get the indexes of first cell in the row above the row with the supplied
 * index.
 * 
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of first cell in the row above the one with the
 * supplied index.
 * @private
 */
// eslint-disable-next-line no-unused-vars
const firstCellOfRowAbove = rowIndex => [firstColumn(), decrement(rowIndex)];

/**
 * Get the indexes of last cell in the row below the row with the supplied
 * index.
 * 
 * @param {number} rowIndex The row index.
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {array} The indexes of last cell in the row below the one with the
 * supplied index.
 * @private
 */
// eslint-disable-next-line no-unused-vars
const lastCellOfRowBelow = (rowIndex, totalColumns) => [
  lastColumn(totalColumns),
  increment(rowIndex),
];

/**
 * Get the indexes of last cell in the row above the row with the supplied
 * index.
 * 
 * @param {number} rowIndex The row index.
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {array} The indexes of last cell in the row above the one with the
 * supplied index.
 * @private
 */
const lastCellOfRowAbove = (rowIndex, totalColumns) => [
  lastColumn(totalColumns),
  decrement(rowIndex),
];

/**
 * Is this the index of the first column?
 * 
 * @param {number} columnIndex The column index.
 * 
 * @returns {boolean} Was the supplied index the index of the first column?
 * @private
 */
const isFirstColumn = columnIndex => columnIndex === firstColumn();

/**
 * Is this the index of the last column?
 * 
 * @param {number} columnIndex The column index.
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {boolean} Was the supplied index the index of the last column?
 * @private
 */
const isLastColumn = (columnIndex, totalColumns) =>
  columnIndex === lastColumn(totalColumns);

/**
 * Is this the index of the first row?
 * 
 * @param {number} rowIndex The row index.
 * 
 * @returns {boolean} Was the supplied index the index of the first row?
 * @private
 */
const isFirstRow = rowIndex => rowIndex === firstRow();

/**
 * Is this the index of the last row?
 * 
 * @param {number} rowIndex The row index.
 * @param {number} totalRows The total number of rows.
 * 
 * @returns {boolean} Was the supplied index the index of the last row?
 * @private
 */
const isLastRow = (rowIndex, totalRows) => rowIndex === lastRow(totalRows);

/**
 * Are these the indexes of the top left cell?
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {boolane} Werre the supplied indexes the indexes of the top left cell?
 * @private
 */
const isTopLeftCell = (columnIndex, rowIndex) =>
  isFirstColumn(columnIndex) && isFirstRow(rowIndex);

/**
 * Are these the indexes of the top right cell?
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {boolane} Werre the supplied indexes the indexes of the top right cell?
 * @private
 */
const isTopRightCell = (columnIndex, rowIndex, totalColumns) =>
  isLastColumn(columnIndex, totalColumns) && isFirstRow(rowIndex);

/**
 * Are these the indexes of the bottom right cell?
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * @param {number} totalColumns The total number of columns.
 * @param {number} totalRows The total number of rows.
 * 
 * @returns {boolane} Werre the supplied indexes the indexes of the bottom right
 * cell?
 * @private
 */
const isBottomRightCell = (columnIndex, rowIndex, totalColumns, totalRows) =>
  isLastColumn(columnIndex, totalColumns) && isLastRow(rowIndex, totalRows);

/**
 * Are these the indexes of the bottom left cell?
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * @param {number} totalColumns The total number of columns.
 * @param {number} totalRows The total number of rows.
 * 
 * @returns {boolane} Werre the supplied indexes the indexes of the bottom left
 * cell?
 * @private
 */
const isBottomLeftCell = (columnIndex, rowIndex, totalColumns, totalRows) =>
  isFirstColumn(columnIndex) && isLastRow(rowIndex, totalRows);

const startingCellFuncMap = {
  [TOP_LEFT_CORNER]: {
    [HORIZONTAL]: [
      topLeftCell,
      isBottomRightCell,
      (x, y, totalColumns) =>
        isLastColumn(x, totalColumns)
          ? firstCellOfRowBelow(y)
          : cellToRight(x, y),
    ],
    [VERTICAL]: [
      topLeftCell,
      isBottomRightCell,
      (x, y, totalColumns, totalRows) =>
        isLastRow(y, totalRows) ? firstCellOfNextColumn(x) : cellBelow(x, y),
    ],
  },
  [TOP_RIGHT_CORNER]: {
    [HORIZONTAL]: [
      topRightCell,
      isBottomLeftCell,
      (x, y, totalColumns) =>
        isFirstColumn(x)
          ? lastCellOfRowBelow(y, totalColumns)
          : cellToLeft(x, y),
    ],
    [VERTICAL]: [
      topRightCell,
      isBottomLeftCell,
      (x, y, totalColumns, totalRows) =>
        isLastRow(y, totalRows)
          ? firstCellOfPreviousColumn(x)
          : cellBelow(x, y),
    ],
  },
  [BOTTOM_RIGHT_CORNER]: {
    [HORIZONTAL]: [
      bottomRightCell,
      isTopLeftCell,
      (x, y, totalColumns) =>
        isFirstColumn(x)
          ? lastCellOfRowAbove(y, totalColumns)
          : cellToLeft(x, y),
    ],
    [VERTICAL]: [
      bottomRightCell,
      isTopLeftCell,
      (x, y, totalColumns, totalRows) =>
        isFirstRow(y)
          ? lastCellOfPreviousColumn(x, totalRows)
          : cellAbove(x, y),
    ],
  },
  [BOTTOM_LEFT_CORNER]: {
    [HORIZONTAL]: [
      bottomLeftCell,
      isTopRightCell,
      (x, y, totalColumns) =>
        isLastColumn(x, totalColumns)
          ? firstCellOfRowAbove(y)
          : cellToRight(x, y),
    ],
    [VERTICAL]: [
      bottomLeftCell,
      isTopRightCell,
      (x, y, totalColumns, totalRows) =>
        isFirstRow(y) ? lastCellOfNextColumn(x, totalRows) : cellAbove(x, y),
    ],
  },
};

// -----------------------------------------------------------------------------
// Create
// -----------------------------------------------------------------------------

/**
 * This function encapsulates the creation of particular kind of strategy - one 
 * that runs in a linear fashion over the cells. There are four flavours of
 * linear strategy which are explained in their own docs.
 * 
 * @param {function} getStartingCell A function returning the starting cell
 * indexes.
 * @param {function} isEndingCell A function returning the ending cell indexes.
 * @param {function} getNextCell A function returning the next cell of the
 * iteration.
 * 
 * @returns {function} A function to be called by the iterator on each
 * iteration. The function will return an iteration result that will have a key
 * of `done` set to either `false` or `true` and a `value` key set to the
 * indexes of the current cell unless `done` is `true` in which case it will be
 * empty.
 */
const createLinearStrategy = (getStartingCell, isEndingCell, getNextCell) => (
  totalColumns,
  totalRows
) => {
  let [x, y] = getStartingCell(totalColumns, totalRows);
  let done = false;

  const next = () => {
    if (done) return { done };

    const result = {
      value: [x, y],
      done,
    };

    if (isEndingCell(x, y, totalColumns, totalRows)) {
      done = true;
    } else {
      [x, y] = getNextCell(x, y, totalColumns, totalRows);
    }

    return result;
  };
  return next;
};

// -----------------------------------------------------------------------------
// Iterators
// -----------------------------------------------------------------------------

export const linearIterator = (startingCorner, direction) => {
  const [startingCell, isFinalCell, func] = startingCellFuncMap[startingCorner][
    direction
  ];
  const strategy = createLinearStrategy(startingCell, isFinalCell, func);

  return curry(createIterator)(strategy);
};
