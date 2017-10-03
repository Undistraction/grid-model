/** @module Grid */

import { isNumber, isNil } from 'lodash';
import { isPositiveInteger } from './validations';
import createDimensions from './dimensions';
import { linearHorizontalForwardStrategy } from './iteratorStrategies/linear';
import createRegion from './region';
import createPoint from './point';
import createIterator from './iterator';
import { throwError } from './errors';
import { print, printDivider } from './logging';
import { keepGreatest, keepSmallest } from './math';

// -----------------------------------------------------------------------------
// Error Messages
// -----------------------------------------------------------------------------

export const INVALID_PARAMS_MESSAGE =
  "You didn't supply sufficient params to derive a valid grid";

export const CONFLICTING_PARAMS_MESSAGE =
  'You supplied params that cannot be reconciled to a valid grid';

export const ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE =
  'Zero is not a valid value for rows or columns';

export const INVALID_COLUMN_INDEX_MESSAGE =
  'The column index supplied was invalid';

export const INVALID_ROW_INDEX_MESSAGE = 'The row index supplied was invalid';

// -----------------------------------------------------------------------------
// Logging
// -----------------------------------------------------------------------------

const printInfo = grid => {
  printDivider();
  print('Grid');
  printDivider();
  print(`Width:              ${grid.width}`);
  print(`Height:             ${grid.height}`);
  print(`Aspect Ratio:       ${grid.aspectRatio}`);
  print(`Columns:            ${grid.columns}`);
  print(`Rows:               ${grid.rows}`);
  print(`Cell Width:         ${grid.cellWidth}`);
  print(`Cell Height:        ${grid.cellHeight}`);
  print(`Gutter Width:       ${grid.gutterWidth}`);
  print(`Gutter Height:      ${grid.gutterHeight}`);
  print(`Total cells:        ${grid.matrixDimensions.area()}`);
  printDivider();
};

// -----------------------------------------------------------------------------
// Utility
// -----------------------------------------------------------------------------

/**
 * Get the default strategy for the grid.
 * 
 * @returns {function} The default iterator strategy for the grid.
 * @private
 */
const defaultStrategy = () => linearHorizontalForwardStrategy;

/**
 * Use the extents of all the supplied cells to calculate a region that includes
 * them all.
 * 
 * @param {array} cells An array of cells. 
 * @returns {object} Region encompassing all supplied cells.
 * @private
 */
const regionForCells = cells => {
  const tlX = cells
    .map(cell => cell.topLeftPoint.x)
    .reduce(keepSmallest, Infinity);
  const tlY = cells
    .map(cell => cell.topLeftPoint.y)
    .reduce(keepSmallest, Infinity);
  const brX = cells
    .map(cell => cell.bottomRightPoint.x)
    .reduce(keepGreatest, 0);
  const brY = cells
    .map(cell => cell.bottomRightPoint.y)
    .reduce(keepGreatest, 0);

  const regionTopLeftPoint = createPoint(tlX, tlY);
  const regionDimensions = createDimensions({
    width: brX - tlX,
    height: brY - tlY,
  });

  return createRegion(regionTopLeftPoint, regionDimensions);
};

/**
 * 
 * Filter out any params that haven't been set.  
 * 
 * @param {array} params Array of params to check.
 * @returns {array} of params that have been set.
 * @private
 */
const validParamCount = params =>
  params.filter(param => !isNil(param) && param !== '').length;

/**
 * 
 * Validates the params to ensure enough information was supplied to derive a
 * valid grid.
 * 
 * @param {number} width The width of the grid.
 * @param {number} height The height of the grid.
 * @param {number} aspectRatio the aspect ratio of the grid.
 * @param {number} rows the number of rows in the grid.
 * @param {number} columns the number of columns in the grid.
 * @param {number} cellWidth the width of cell in the grid.
 * @param {number} cellHeight the height of a cell in the grid.
 * 
 * @returns {null} Nothing is returned.
 * @private
 */
const validateParams = (
  width,
  height,
  aspectRatio,
  rows,
  columns,
  cellWidth,
  cellHeight
) => {
  // Zero values aren't valid
  if (columns === 0 || rows === 0) {
    throwError(ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE);
  }

  // Guard against cellWidth or cellHeight that would break grid;
  if (
    (isNumber(columns) && isNumber(cellWidth) && isNumber(width)) ||
    (isNumber(rows) && isNumber(cellHeight) && isNumber(height))
  ) {
    if (columns * cellWidth > width || rows * cellHeight > height) {
      throwError(CONFLICTING_PARAMS_MESSAGE);
    }
  }
};

/**
 * Check the supplied arguments to see if they can be used to derive a width for
 * the grid.
 * 
 * @param {number} cellHeight The height of a cell in the grid.
 * @param {number} rows The number of rows in the grid.
 * 
 * @returns {boolean} Is there enought information to derive a width for the
 * grid?
 * @private
 */
const canDeriveWidth = (cellHeight, rows) =>
  !!(isNumber(cellHeight) && isNumber(rows));

/**
 * Check the supplied arguments to see if they can be used to derive a height
 * for the grid.
 * 
 * @param {number} cellWidth The width of a cell in the grid.
 * @param {number} columns The number of columns in the grid.
 * 
 * @returns {boolean} Is there enought information to derive a height for the
 * grid?
 * @private
 */
const canDeriveHeight = (cellWidth, columns) =>
  !!(isNumber(cellWidth) && isNumber(columns));

/**
 * Calculate the width of the grid using the supplied values.
 * 
 * @param {number} columns The number of columns in the grid.
 * @param {number} cellWidth The width of a cell in the grid.
 * @param {number} gutterWidth The width of the gutters in the grid.
 * 
 * @returns {number} The calculated width of the grid.
 * @private
 */
const deriveWidth = (columns, cellWidth, gutterWidth = 0) =>
  cellWidth * columns + gutterWidth * (columns - 1);

/**
 * Calculate the height of the grid using the supplied values.
 * 
 * @param {number} rows The number of rows in the grid.
 * @param {number} cellHeight The height of a cell in the grid.
 * @param {number} gutterHeight The height of the gutters in the grid.
 * 
 * @returns {number} The calculated height of the grid.
 * @private
 */
const deriveHeight = (rows, cellHeight, gutterHeight = 0) =>
  cellHeight * rows + gutterHeight * (rows - 1);

/**
 * Calculate the width of the cells in the grid using the supplied values.
 * 
 * @param {number} width The height of the grid.
 * @param {number} gutterWidth The width of a gutter in the grid.
 * @param {number} columns The number of columns in the grid.
 * 
 * @returns {number} The width of cells in the grid.
 * @private
 */
const deriveCellWidth = (width, gutterWidth = 0, columns) =>
  (width - gutterWidth * (columns - 1)) / columns;

/**
 * Calculate the height of the cells in the grid using the supplied values.
 * 
 * @param {number} height The height of the grid.
 * @param {number} gutterHeight The height of a gutter in the grid.
 * @param {number} rows The number of rows in the grid.
 * 
 * @returns {number} The height of cells in the grid.
 * @private
 */
const deriveCellHeight = (height, gutterHeight = 0, rows) =>
  (height - gutterHeight * (rows - 1)) / rows;

/**
 * Check the supplied arguments to see if they can be used to derive the number
 * of columns in the grid. 
 * @param {number} width The width of the grid.
 * @param {*} cellWidth The width of a cell in the grid.
 * 
 * @returns {boolean} Is there enought information to derive a number of columns
 * in the grid?
 * @private
 */
const canDeriveColumns = (width, cellWidth) =>
  !!(isNumber(width) && isNumber(cellWidth));

/**
 * Check the supplied arguments to see if they can be used to derive the number
 * of rows in the grid. 
 * @param {number} height The height of the grid.
 * @param {*} cellHeight The height of a cell in the grid.
 * 
 * @returns {boolean} Is there enought information to derive a number of rows
 * in the grid?
 * @private
 */
const canDeriveRows = (height, cellHeight) =>
  !!(isNumber(height) && isNumber(cellHeight));

/**
 * Calculate the number of columns in the grid using the supplied argumnets.
 * 
 * @param {number} width The width of the grid.
 * @param {number} cellWidth The width of a cell in the grid.
 * 
 * @returns {number} The number of columns in the grid.
 * @private
 */
const deriveColumns = (width, cellWidth) => width / cellWidth;

/**
 * Calculate the number of rows in the grid using the supplied argumnets.
 * 
 * @param {number} height The height of the grid.
 * @param {number} cellHeight The height of a cell in the grid.
 * 
 * @returns {number} The number of rows in the grid.
 * @private
 */
const deriveRows = (height, cellHeight) => height / cellHeight;

/**
 * Check if a column of the supplied index is valid for this grid.
 * 
 * @param {number} columnIndex The (zero-based) position of the column.
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {boolean} Does a column of the supplied index exist in this grid?
 * @private
 */
const columnExists = (columnIndex, totalColumns) =>
  columnIndex <= totalColumns - 1;

/**
 * Check if a row of the supplied index is valid for this grid.
 * 
 * @param {number} rowIndex The (zero-based) position of the row.
 * @param {number} totalRows The total number of rows.
 * 
 * @returns {boolean} Does a row of the supplied index exist in this grid?
 * @private
 */
const rowExists = (rowIndex, totalRows) => rowIndex <= totalRows - 1;

/**
 * Create a point representing the top left point of the cell.
 * 
 * @param {number} x The horizontal position of the cell.
 * @param {number} y The vertical position of the cell.
 * @param {number} cellWidth The width of the cell.
 * @param {number} cellHeight The height of the cell.
 * @param {number} gutterWidth The width of the gutters.
 * @param {number} gutterHeight The height of the gutters.
 * 
 * @returns {object} a point
 * @private
 */
const createTopLeftPointForCell = (
  x,
  y,
  cellWidth,
  cellHeight,
  gutterWidth,
  gutterHeight
) => {
  const xPos = (cellWidth + gutterWidth) * x;
  const yPos = (cellHeight + gutterHeight) * y;
  return createPoint(xPos, yPos);
};

/**
 * Save the dimensions of the grid using the explicit values or deriving them
 * from other values if they were not supplied.
 * 
 * @param {number} width The width of the grid. 
 * @param {number} height The height of the grid.
 * @param {number} aspectRatio The aspect ratio of the grid.
 * @param {number} columns The number of columns in the grid.
 * @param {number} rows The number of rows in the grid.
 * @param {number} cellWidth The width of cells in the grid.
 * @param {number} cellHeight The height of cells in the grid.
 * @param {number} gutterWidth The width of the gutters in the grid.
 * @param {number} gutterHeight The height of the gutters in the grid.
 * 
 * @returns {object} An object representing the dimensions of the grid.
 * @private
 */
const saveDimensions = (
  width,
  height,
  aspectRatio,
  columns,
  rows,
  cellWidth,
  cellHeight,
  gutterWidth,
  gutterHeight
) => {
  if (!isNumber(width) && !isNumber(aspectRatio)) {
    if (canDeriveWidth(cellHeight, rows)) {
      width = deriveWidth(columns, cellWidth, gutterWidth);
    }
  }

  if (!isNumber(height) && !isNumber(aspectRatio)) {
    if (canDeriveHeight(cellWidth, columns)) {
      height = deriveHeight(rows, cellHeight, gutterHeight);
    }
  }

  // If we don't have at least two params, throw an Error.
  if (validParamCount([width, height, aspectRatio]) < 2) {
    throwError(INVALID_PARAMS_MESSAGE);
  }

  return createDimensions({ width, height, aspectRatio });
};

/**
 * Save the matrix dimensions using the explicit column and row values or
 * deriving them from other values if they were not supplied.
 * 
 * @param {number} columns The number of columns in the grid.
 * @param {number} rows The number of rows in the grid.
 * @param {object} dimensions The dimensions of the grid.
 * @param {number} cellWidth The width of cells in the grid.
 * @param {number} cellHeight The height of cells in the grid.
 * 
 * @returns {object} An object representing the grid dimensions.
 * @private
 */
const saveMatrixDimensions = (
  columns,
  rows,
  dimensions,
  cellWidth,
  cellHeight
) => {
  const resolvedColumns = isNumber(columns)
    ? columns
    : canDeriveColumns(dimensions.width, cellWidth) &&
      deriveColumns(dimensions.width, cellWidth);
  const resolvedRows = isNumber(rows)
    ? rows
    : canDeriveRows(dimensions.height, cellHeight) &&
      deriveRows(dimensions.height, cellHeight);

  if (!resolvedColumns || !resolvedRows) {
    throwError(INVALID_PARAMS_MESSAGE);
  }

  const rowParts = resolvedRows.toString().split('.');
  const columnParts = resolvedColumns.toString().split('.');

  const wholeRows = Number(rowParts[0]);
  const wholeColumns = Number(columnParts[0]);

  return createDimensions({
    width: wholeColumns,
    height: wholeRows,
  });
};

/**
 * Save the cell dimensions using the explicit values or deriving them from
 * other values if they were not supplied.
 * 
 * @param {number} cellWidth The width of cells in the grid.
 * @param {number} cellHeight The height of cells in the grid.
 * @param {number} gutterWidth The width of gutters in the grid.
 * @param {number} gutterHeight The height of gutters in the grid.
 * @param {object} dimensions The dimensions of the grid.
 * @param {object} matrixDimensions The matrix dimensions of the grid.
 * 
 * @returns {object} An object representing the grid dimensions.
 * @private
 */
const saveCellDimensions = (
  cellWidth,
  cellHeight,
  gutterWidth,
  gutterHeight,
  dimensions,
  matrixDimensions
) => {
  const width = isNumber(cellWidth)
    ? cellWidth
    : deriveCellWidth(dimensions.width, gutterWidth, matrixDimensions.width);
  const height = isNumber(cellHeight)
    ? cellHeight
    : deriveCellHeight(
        dimensions.height,
        gutterHeight,
        matrixDimensions.height
      );

  return createDimensions({ width, height });
};

/**
 * Save the gutter dimensions using the explicit values or deriving them from
 * other values if they were not supplied.
 * 
 * @param {number} gutterWidth The width of gutters in the grid.
 * @param {number} gutterHeight The height of gutters in the grid.
 * @param {number} dimensions The dimensions of the grid.
 * @param {number} matrixDimensions The matrix dimensions of the grid.
 * @param {number} cellDimensions The cell dimensions of the grtid.
 * 
 * @returns {object} An object representing the gutter dimensions of the grid.
 * @private
 */
const saveGutterDimensions = (
  gutterWidth,
  gutterHeight,
  dimensions,
  matrixDimensions,
  cellDimensions
) => {
  const remainingHSpace =
    dimensions.width - matrixDimensions.width * cellDimensions.width;
  const remainingVSpace =
    dimensions.height - matrixDimensions.height * cellDimensions.height;

  const calculatedGutterWidth = remainingHSpace / (matrixDimensions.width - 1);
  const calcualtedGutterHeight =
    remainingVSpace / (matrixDimensions.height - 1);

  if (
    (matrixDimensions.width > 1 &&
      isNumber(gutterWidth) &&
      gutterWidth !== calculatedGutterWidth) ||
    (matrixDimensions.height > 1 &&
      isNumber(gutterHeight) &&
      gutterHeight !== calcualtedGutterHeight)
  ) {
    throwError(CONFLICTING_PARAMS_MESSAGE);
  }

  return createDimensions({
    width: calculatedGutterWidth,
    height: calcualtedGutterHeight,
  });
};

/**
 * Validate the supplied column index, making sure it exists in the grid.
 * 
 * @param {number} index The (zero based) position of the column in the grid.
 * @param {number} total The total number of columns in the grid.
 * 
 * @returns {boolean} Does the supplied column index exist.
 * @private
 */
const validateColumnIndex = (index, total) => {
  if (
    isNil(index) ||
    !isPositiveInteger(index) ||
    !columnExists(index, total)
  ) {
    throwError(INVALID_COLUMN_INDEX_MESSAGE);
  }
};

/**
 * Validate the supplied row index, making sure it exists in the grid.
 * 
 * @param {number} index The (zero based) position of the row in the grid.
 * @param {number} total The total number of columns in the grid.
 * 
 * @returns {boolean} Does the supplied row index exist.
 * @private
 */
const validateRowIndex = (index, total) => {
  if (isNil(index) || !isPositiveInteger(index) || !rowExists(index, total)) {
    throwError(INVALID_ROW_INDEX_MESSAGE);
  }
};

// -----------------------------------------------------------------------------
// Entry
// -----------------------------------------------------------------------------

/**
 * Create an object representing a grid.
 * 
 * @param {object} params A params object.
 * @param {number} width The width of the grid.
 * @param {number} height The height of the grid.
 * @param {number} aspectRatio The aspect ratio of the grid.
 * @param {number} rows The number of rows in the grid.
 * @param {number} columns The number of columns in the grid.
 * @param {number} cellWidth The width of a grid cell.
 * @param {number} cellHeight The height of a grid cell.
 * @param {number} gutterWidth The width of the gutters between grid cells.
 * @param {number} gutterHeight The height of the gutters between grid cells.
 * @param {number} gutter  The width and height of the gutters between grid
 * cells.
 * @returns {object} A grid object.
 */
const createGrid = (
  {
    width,
    height,
    aspectRatio,
    rows,
    columns,
    cellWidth,
    cellHeight,
    gutterWidth,
    gutterHeight,
    gutter,
  } = {}
) => {
  validateParams(
    width,
    height,
    aspectRatio,
    rows,
    columns,
    cellWidth,
    cellHeight,
    gutterWidth,
    gutterHeight,
    gutter
  );

  // Transfer gutter value to gutterWidth and gutterHeight if they aren't set

  if (!isNumber(gutterWidth) && isNumber(gutter)) gutterWidth = gutter;
  if (!isNumber(gutterHeight) && isNumber(gutter)) gutterHeight = gutter;

  const dimensions = saveDimensions(
    width,
    height,
    aspectRatio,
    columns,
    rows,
    cellWidth,
    cellHeight,
    gutterWidth,
    gutterHeight
  );

  const matrixDimensions = saveMatrixDimensions(
    columns,
    rows,
    dimensions,
    cellWidth,
    cellHeight
  );

  const cellDimensions = saveCellDimensions(
    cellWidth,
    cellHeight,
    gutterWidth,
    gutterHeight,
    dimensions,
    matrixDimensions
  );
  const gutterDimensions = saveGutterDimensions(
    gutterWidth,
    gutterHeight,
    dimensions,
    matrixDimensions,
    cellDimensions
  );

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  /**
   * Get the region for the cell at the supplied indexes.
   * 
   * @param {number} columnIndex The column index of the cell.
   * @param {number} rowIndex  The row index of the cell.
   * 
   * @returns {object} A region object for the cell at the supplied indexes.
   */
  const regionForCellAt = (columnIndex, rowIndex) => {
    validateColumnIndex(columnIndex, matrixDimensions.width);
    validateRowIndex(rowIndex, matrixDimensions.height);

    return createRegion(
      createTopLeftPointForCell(
        columnIndex,
        rowIndex,
        cellDimensions.width,
        cellDimensions.height,
        gutterDimensions.width,
        gutterDimensions.height
      ),
      cellDimensions
    );
  };

  /**
   * Get the region encompassing the cells at the supplied indexes.
   * 
   * @param {number} startColumnIndex The column index of the first cell.
   * @param {number} startRowIndex The row index of the first cell.
   * @param {number} endColumnIndex The column index of the last cell.
   * @param {number} endRowIndex The row index of the last cell.
   * 
   * @returns {object} A region object encompassing the cells at he supplied
   * indexes.
   */
  const regionForCellsAt = (
    startColumnIndex,
    startRowIndex,
    endColumnIndex,
    endRowIndex
  ) => {
    const startCell = regionForCellAt(startColumnIndex, startRowIndex);
    const endCell = regionForCellAt(endColumnIndex, endRowIndex);
    return regionForCells([startCell, endCell]);
  };

  /**
   * Get the region encompassing one or more consecutive columns.
   * 
   * @param {number} startIndex The index of the first column.
   * @param {any} endIndex The index of the last column.
   *  
   * @returns {object} A region object ecompassing all columns between the
   * supplied indexes.
   */
  const regionForColumns = (startIndex, endIndex) => {
    const startCell = regionForCellAt(startIndex, 0);

    const endCell = regionForCellAt(
      !isNil(endIndex) ? endIndex : startIndex,
      matrixDimensions.height - 1
    );

    return regionForCells([startCell, endCell]);
  };

  /**
   * Get the region encompassing one or more consecutive rows.
   * 
   * @param {number} startIndex The index of the first row.
   * @param {any} endIndex The index of the last row.
   *  
   * @returns {object} A region object ecompassing all rows between the
   * supplied indexes.
   */
  const regionForRows = (startIndex, endIndex) => {
    const startCell = regionForCellAt(0, startIndex);

    const endCell = regionForCellAt(
      matrixDimensions.width - 1,
      !isNil(endIndex) ? endIndex : startIndex
    );

    return regionForCells([startCell, endCell]);
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  return {
    width: dimensions.width,
    height: dimensions.height,
    aspectRatio: dimensions.aspectRatio,
    get dimensions() {
      return dimensions;
    },
    rows: matrixDimensions.height,
    columns: matrixDimensions.width,
    get matrixDimensions() {
      return matrixDimensions;
    },
    cellWidth: cellDimensions.width,
    cellHeight: cellDimensions.height,
    get cellDimensions() {
      return cellDimensions;
    },
    gutterWidth: gutterDimensions.width,
    gutterHeight: gutterDimensions.height,
    get gutterDimensions() {
      return gutterDimensions;
    },

    /**
     * Print information about the grid.
     * 
     * @returns {undefined}
     */
    info() {
      printInfo(this);
    },

    /**
     * Get the number of cells in the grid (columns * rows)
     * 
     * @returns {number} the number of cells in the grid.
     */
    cellCount: matrixDimensions.area,
    regionForCellAt,
    regionForColumns,
    regionForRows,
    regionForCellsAt,
    // Note: Don't use an arrow function as we want it to bind to this object.

    /**
     * Get the grid's default iterator object.
     * 
     * @returns {object} The default iterator object for the grid.
     */
    getIterator() {
      return createIterator(this);
    },
    iteratorStrategy: defaultStrategy(),
  };
};

export default createGrid;
