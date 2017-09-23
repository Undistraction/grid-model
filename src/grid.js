import { isNumber, isNil } from 'lodash-es';
import { isPositiveInteger } from './validations';
import createDimensions from './dimensions';
import createRegion from './region';
import createPoint from './point';
import createIterator from './iterator';

// -----------------------------------------------------------------------------
// Error Messages
// -----------------------------------------------------------------------------

export const INVALID_PARAMS_MESSAGE =
  "You didn't supply sufficient params to derive a valid grid";

export const CONFLICTING_PARAMS_MESSAGE =
  'You supplied params that cannot be reconciled to a valid grid';

export const INVALID_CELL_INDEX_MESSAGE = 'The cell index supplied was invalid';

export const INVALID_CELL_LOCATION_MESSAGE =
  'You must supply an x and y position to cellAt()';

export const ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE =
  'Zero is not a valid value for rows or columns';

export const INVALID_COLUMN_INDEX_MESSAGE = 'The column index was invalid';

export const INVALID_ROW_INDEX_MESSAGE = 'The column index was invalid';

// -----------------------------------------------------------------------------
// Utility
// -----------------------------------------------------------------------------

const regionForCells = cells => {
  const tlX = cells
    .map(cell => cell.topLeftPoint.x)
    .reduce((acc, cur) => (cur < acc ? cur : acc), Infinity);
  const tlY = cells
    .map(cell => cell.topLeftPoint.y)
    .reduce((acc, cur) => (cur < acc ? cur : acc), Infinity);
  const brX = cells
    .map(cell => cell.bottomRightPoint.x)
    .reduce((acc, cur) => (cur > acc ? cur : acc), 0);
  const brY = cells
    .map(cell => cell.bottomRightPoint.y)
    .reduce((acc, cur) => (cur > acc ? cur : acc), 0);

  const regionTopLeftPoint = createPoint(tlX, tlY);
  const regionDimensions = createDimensions({
    width: brX - tlX,
    height: brY - tlY,
  });

  return createRegion(regionTopLeftPoint, regionDimensions);
};

/**
 * 
 * @param {*} params Array of params to check
 * @returns {array} of params that have been set
 * 
 * Filter out any params that haven't been set. 
 */
const validParamCount = params =>
  params.filter(param => !isNil(param) && param !== '').length;

/**
 * 
 * @param {number} width The width of the grid.
 * @param {number} height The height of the grid.
 * @param {number} aspectRatio the aspect ratio of the grid.
 * @param {number} rows the number of rows in the grid.
 * @param {number} columns the number of columns in the grid.
 * @param {number} cellWidth the width of cell in the grid.
 * @param {number} cellHeight the height of a cell in the grid.
 * 
 * Validates the params to ensure enough information was supplied to derive a
 * valid grid.
 * 
 * @returns {null} Nothing is returned.
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
  // // Without columns we must have a cellWidth to derive the
  // if (
  //   (!isNumber(columns) && !isNumber(cellWidth)) ||
  //   (!isNumber(rows) && !isNumber(cellHeight))
  // ) {
  //   throw new Error(INVALID_PARAMS_MESSAGE);
  // }

  // Guard against cellWidth or cellHeight that would break grid;
  if (
    (isNumber(columns) && isNumber(cellWidth) && isNumber(width)) ||
    (isNumber(rows) && isNumber(cellHeight) && isNumber(height))
  ) {
    if (columns * cellWidth > width || rows * cellHeight > height) {
      throw new Error(CONFLICTING_PARAMS_MESSAGE);
    }
  }
};

const canDeriveWidth = (cellHeight, rows) =>
  !!(isNumber(cellHeight) && isNumber(rows));
const canDeriveHeight = (cellWidth, columns) =>
  !!(isNumber(cellWidth) && isNumber(columns));
const deriveHeight = (rows, cellHeight, gutterHeight = 0) =>
  cellHeight * rows + gutterHeight * (rows - 1);
const deriveWidth = (columns, cellWidth, gutterWidth = 0) =>
  cellWidth * columns + gutterWidth * (columns - 1);

const deriveCellWidth = (width, gutterWidth = 0, columns) =>
  (width - gutterWidth * (columns - 1)) / columns;
const deriveCellHeight = (height, gutterHeight = 0, rows) =>
  (height - gutterHeight * (rows - 1)) / rows;

const canDeriveColumns = (width, cellWidth) =>
  !!(isNumber(width) && isNumber(cellWidth));
const canDeriveRows = (height, cellHeight) =>
  !!(isNumber(height) && isNumber(cellHeight));
const deriveColumns = (width, cellWidth) => width / cellWidth;
const deriveRows = (height, cellHeight) => height / cellHeight;

const isValidColumnIndex = (columnIndex, totalColumns) =>
  columnIndex <= totalColumns - 1;
const isValidRowIndex = (rowIndex, totalRows) => rowIndex <= totalRows - 1;

const topLeftPointForCell = (
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

// /**
//  *
//  * @param {number} width The
//  * @param {number} height
//  * @param {number} aspectRatio
//  * @param {number} rows
//  * @param {number} columns
//  * @param {number} cellWidth
//  * @param {number} cellHeight
//  * @param {number} gutterWidth
//  * @param {number} gutterHeight
//  *
// * Create a dimensions object to represent the width and height of the grid.
//    * If this information hasn't been explicly supplied, try to derive that info
//    * from the other parameters supplied. If there is no way to assertain the
//    * dimensions, throw an Error.
//    *
//    * @returns {object} dimensions
//  */
const calculateDimensions = (
  width,
  height,
  aspectRatio,
  rows,
  columns,
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
    throw new Error(INVALID_PARAMS_MESSAGE);
  }

  return createDimensions({ width, height, aspectRatio });
};

const calcualteGridDimensions = (
  columns,
  rows,
  dimensions,
  cellWidth,
  cellHeight
) => {
  if (columns === 0 || rows === 0) {
    throw new Error(ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE);
  }

  const c = isNumber(columns)
    ? columns
    : canDeriveColumns(dimensions.width, cellWidth) &&
      deriveColumns(dimensions.width, cellWidth);
  const r = isNumber(rows)
    ? rows
    : canDeriveRows(dimensions.height, cellHeight) &&
      deriveRows(dimensions.height, cellHeight);

  if (!r || !c) {
    throw new Error(INVALID_PARAMS_MESSAGE);
  }

  const rowParts = r.toString().split('.');
  const columnParts = c.toString().split('.');

  const wholeRows = Number(rowParts[0]);
  const wholeColumns = Number(columnParts[0]);

  return createDimensions({
    width: wholeColumns,
    height: wholeRows,
  });
};

const calculateCellDimensions = (
  cellWidth,
  cellHeight,
  gutterWidth,
  gutterHeight,
  dimensions,
  gridDimensions
) => {
  const width = isNumber(cellWidth)
    ? cellWidth
    : deriveCellWidth(dimensions.width, gutterWidth, gridDimensions.width);
  const height = isNumber(cellHeight)
    ? cellHeight
    : deriveCellHeight(dimensions.height, gutterHeight, gridDimensions.height);

  return createDimensions({ width, height });
};

const calculateGutterDimensions = (
  gutterWidth,
  gutterHeight,
  dimensions,
  gridDimensions,
  cellDimensions
) => {
  const remainingHSpace =
    dimensions.width - gridDimensions.width * cellDimensions.width;
  const remainingVSpace =
    dimensions.height - gridDimensions.height * cellDimensions.height;

  const calculatedGutterWidth = remainingHSpace / (gridDimensions.width - 1);
  const calcualtedGutterHeight = remainingVSpace / (gridDimensions.height - 1);

  if (
    (gridDimensions.width > 1 &&
      isNumber(gutterWidth) &&
      gutterWidth !== calculatedGutterWidth) ||
    (gridDimensions.height > 1 &&
      isNumber(gutterHeight) &&
      gutterHeight !== calcualtedGutterHeight)
  ) {
    throw new Error(CONFLICTING_PARAMS_MESSAGE);
  }

  return createDimensions({
    width: calculatedGutterWidth,
    height: calcualtedGutterHeight,
  });
};

// -----------------------------------------------------------------------------
// Entry
// -----------------------------------------------------------------------------

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

  const dimensions = calculateDimensions(
    width,
    height,
    aspectRatio,
    rows,
    columns,
    cellWidth,
    cellHeight,
    gutterWidth,
    gutterHeight
  );

  const gridDimensions = calcualteGridDimensions(
    columns,
    rows,
    dimensions,
    cellWidth,
    cellHeight
  );

  const cellDimensions = calculateCellDimensions(
    cellWidth,
    cellHeight,
    gutterWidth,
    gutterHeight,
    dimensions,
    gridDimensions
  );
  const gutterDimensions = calculateGutterDimensions(
    gutterWidth,
    gutterHeight,
    dimensions,
    gridDimensions,
    cellDimensions
  );

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const cellCount = () => gridDimensions.area();

  const regionForCellAt = (x, y) => {
    if (!isNumber(x) || !isNumber(y)) {
      throw new Error(INVALID_CELL_LOCATION_MESSAGE);
    }

    if (
      !isValidColumnIndex(x, gridDimensions.width) ||
      !isValidRowIndex(y, gridDimensions.height)
    ) {
      throw new Error(INVALID_CELL_INDEX_MESSAGE);
    }

    return createRegion(
      topLeftPointForCell(
        x,
        y,
        cellDimensions.width,
        cellDimensions.height,
        gutterDimensions.width,
        gutterDimensions.height
      ),
      cellDimensions
    );
  };

  const regionForColumns = (start, end) => {
    // Validate start
    if (
      isNil(start) ||
      !isPositiveInteger(start) ||
      !isValidColumnIndex(start, gridDimensions.width)
    ) {
      throw new Error(INVALID_COLUMN_INDEX_MESSAGE);
    }

    // Validate end
    if (
      !isNil(end) &&
      (!isPositiveInteger(end) ||
        !isValidColumnIndex(end, gridDimensions.width))
    ) {
      throw new Error(INVALID_COLUMN_INDEX_MESSAGE);
    }

    const startCell = regionForCellAt(start, 0);
    const endCell = regionForCellAt(
      isNumber(end) ? end : start,
      gridDimensions.height - 1
    );

    return regionForCells([startCell, endCell]);
  };

  const regionForRows = (start, end) => {
    // Validate start
    if (
      isNil(start) ||
      !isPositiveInteger(start) ||
      !isValidRowIndex(start, gridDimensions.height)
    ) {
      throw new Error(INVALID_COLUMN_INDEX_MESSAGE);
    }

    // Validate end
    if (
      !isNil(end) &&
      (!isPositiveInteger(end) || !isValidRowIndex(end, gridDimensions.height))
    ) {
      throw new Error(INVALID_COLUMN_INDEX_MESSAGE);
    }

    const startCell = regionForCellAt(0, start);
    const endCell = regionForCellAt(
      gridDimensions.width - 1,
      isNumber(end) ? end : start
    );

    return regionForCells([startCell, endCell]);
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  return {
    get width() {
      return dimensions.width;
    },
    get height() {
      return dimensions.height;
    },
    get dimensions() {
      return dimensions;
    },
    get aspectRatio() {
      return dimensions.aspectRatio;
    },
    get rows() {
      return gridDimensions.height;
    },
    get columns() {
      return gridDimensions.width;
    },
    get gridDimensions() {
      return gridDimensions;
    },
    get cellWidth() {
      return cellDimensions.width;
    },
    get cellHeight() {
      return cellDimensions.height;
    },
    get cellDimensions() {
      return cellDimensions;
    },
    get gutterWidth() {
      return gutterDimensions.width;
    },
    get gutterHeight() {
      return gutterDimensions.height;
    },
    cellCount,
    regionForCellAt,
    regionForColumns,
    regionForRows,
    // Bind to this object
    getIterator() {
      return createIterator(this);
    },
  };
};

export default createGrid;
