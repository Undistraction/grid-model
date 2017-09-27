// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

/**
 * Increment the supplied index by one.
 * 
 * @param {number} index The index to be incremented.
 * 
 * @return {number} The incremented index.
 */
const incrementIndex = index => index + 1;

/**
 * Decrement the supplied index by one.
 * 
 * @param {number} index The index to be decremented.
 * 
 * @return {number} The decremented index.
 */
const decrementIndex = index => index - 1;

/**
 * @return {number} The index of the first column in the grid. This will always * be zero as column indexes are zero-based.
 */
const firstColumn = () => 0;

/**
 * Get the index of the last column in the grid. This will always be one less
 * than the total number of columns because column indexes are zero-based.
 * 
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {number} Zero-based version of total number of columns.
 */
const lastColumn = totalColumns => totalColumns - 1;

/**
 * @return {number} The index of the first row in the grid. This will always be
 * zero as row indexes are zero-based.
 */
const firstRow = () => 0;

/**
 * Get the index of the last row in the grid. This will always be one less
 * than the total number of rows because row indexes are zero-based.
 * 
 * @param {number} totalRows The total number of rows.
 * 
 * @returns {number} Zero-based version of total number of rows.
 */
const lastRow = totalRows => totalRows - 1;

/**
 * Get the indexes of the first cell in the grid. This will always be [0,0]
 * because column and row indexes are zero-based.
 * 
 * @returns {array} An array containing the column and row indexes of the first
 * cell.
 */
const firstCell = () => [firstColumn(), firstRow()];
const lastCell = (totalColumns, totalRows) => [
  lastColumn(totalColumns),
  lastRow(totalRows),
];

/**
 * Get the indexes of cell to the right of the one with the supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of cell to the right.
 */
const cellToRight = (columnIndex, rowIndex) => [
  incrementIndex(columnIndex),
  rowIndex,
];

/**
 * Get the indexes of cell to the left of the one with the supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of cell to the left.
 */
const cellToLeft = (columnIndex, rowIndex) => [
  decrementIndex(columnIndex),
  rowIndex,
];

/**
 * Get the indexes of cell below the one with the supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of cell below.
 */
const cellBelow = (columnIndex, rowIndex) => [
  columnIndex,
  incrementIndex(rowIndex),
];

/**
 * Get the indexes of cell above the one with the supplied indexes.
 * 
 * @param {number} columnIndex The column index.
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of cell above.
 */
const cellAbove = (columnIndex, rowIndex) => [
  columnIndex,
  decrementIndex(rowIndex),
];

/**
 * Get the indexes of first cell in the next column to the one with the supplied
 * indexes.
 * 
 * @param {number} columnIndex The column index.
 * 
 * @returns {array} The indexes of first cell in the next column to the on with
 * the supplied index.
 */
const firstCellOfNextColumn = columnIndex => [
  incrementIndex(columnIndex),
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
 */
// eslint-disable-next-line no-unused-vars
const firstCellOfPreviousColumn = columnIndex => [
  decrementIndex(columnIndex),
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
 */
// eslint-disable-next-line no-unused-vars
const lastCellOfNextColumn = (columnIndex, totalRows) => [
  incrementIndex(columnIndex),
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
 */
const lastCellOfPreviousColumn = (columnIndex, totalRows) => [
  decrementIndex(columnIndex),
  lastRow(totalRows),
];

/**
 * Get the indexes of first cell in the row below the row with the supplied
 * index.
 * 
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of first cell in the row below.
 */
const firstCellOfRowBelow = rowIndex => [
  firstColumn(),
  incrementIndex(rowIndex),
];

/**
 * Get the indexes of first cell in the row above the row with the supplied
 * index.
 * 
 * @param {number} rowIndex The row index.
 * 
 * @returns {array} The indexes of first cell in the row above.
 */
// eslint-disable-next-line no-unused-vars
const firstCellOfRowAbove = rowIndex => [
  firstColumn(),
  decrementIndex(rowIndex),
];

/**
 * Get the indexes of last cell in the row below the row with the supplied
 * index.
 * 
 * @param {number} rowIndex The row index.
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {array} The indexes of last cell in the row below.
 */
// eslint-disable-next-line no-unused-vars
const lastCellOfRowBelow = (rowIndex, totalColumns) => [
  lastColumn(totalColumns),
  incrementIndex(rowIndex),
];

/**
 * Get the indexes of last cell in the row above the row with the supplied
 * index.
 * 
 * @param {number} rowIndex The row index.
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {array} The indexes of last cell in the row above.
 */
const lastCellOfRowAbove = (rowIndex, totalColumns) => [
  lastColumn(totalColumns),
  decrementIndex(rowIndex),
];

const isFirstColumn = columnIndex => columnIndex === firstColumn();
const isLastColumn = (columnIndex, totalColumns) =>
  columnIndex === lastColumn(totalColumns);
const isFirstRow = rowIndex => rowIndex === firstRow();
const isLastRow = (rowIndex, totalRows) => rowIndex === lastRow(totalRows);
const isFirstCell = (columnIndex, rowIndex) =>
  isFirstColumn(columnIndex) && isFirstRow(rowIndex);
const isLastCell = (columnIndex, rowIndex, totalColumns, totalRows) =>
  isLastColumn(columnIndex, totalColumns) && isLastRow(rowIndex, totalRows);

// -----------------------------------------------------------------------------
// Create
// -----------------------------------------------------------------------------

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
// Linear Strategies
// -----------------------------------------------------------------------------

export const linearHorizontalForwardStrategy = createLinearStrategy(
  firstCell,
  isLastCell,
  // eslint-disable-next-line no-unused-vars
  (x, y, totalColumns, totalRows) =>
    isLastColumn(x, totalColumns) ? firstCellOfRowBelow(y) : cellToRight(x, y)
);

export const linearHorizontalBackwardStrategy = createLinearStrategy(
  lastCell,
  isFirstCell,
  // eslint-disable-next-line no-unused-vars
  (x, y, totalColumns, totalRows) =>
    isFirstColumn(x) ? lastCellOfRowAbove(y, totalColumns) : cellToLeft(x, y)
);

export const linearVerticalForwardStrategy = createLinearStrategy(
  firstCell,
  isLastCell,
  (x, y, totalColumns, totalRows) =>
    isLastRow(y, totalRows) ? firstCellOfNextColumn(x) : cellBelow(x, y)
);

export const linearVerticalBackwardStrategy = createLinearStrategy(
  lastCell,
  isFirstCell,
  (x, y, totalColumns, totalRows) =>
    isFirstRow(y) ? lastCellOfPreviousColumn(x, totalRows) : cellAbove(x, y)
);
