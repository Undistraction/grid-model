import { isNumber, isNil } from 'lodash-es';
import { isPositiveInteger } from './validations';
import createDimensions from './dimensions';
import createRegion from './region';
import createPoint from './point';

// -----------------------------------------------------------------------------
// Error Messages
// -----------------------------------------------------------------------------

export const CANT_DERIVE_CELL_DIMENSIONS_MESSAGE =
  "Grid Couldn't calculate cell dimensions from supplied arguments";

export const CANT_DERIVE_GRID_DIMENSIONS_MESSAGE =
  "Grid Couldn't calculate rows and columns from supplied arguments";

export const INVALID_PARAMS_MESSAGE =
  'You must supply columns OR cellWidth and rows OR cellHeight';

export const INVALID_GRID_DIMENSIONS_MESSAGE =
  'Using the values supplied to calculate rows and columns would result in an invalid grid';

export const INVALID_GUTTER_DIMENSIONS_MESSAGE =
  'The supplied gutter dimensions are incompatible with the other params';

export const INVALID_CELL_INDEX_MESSAGE = 'The cell index supplied was invalid';

export const INVALID_PARAMS_TO_CELL_AT_MESSAGE =
  'You must supply an x and y position to cellAt()';

export const INVALID_COLUMN_INDEX = 'The column index was invalid';

export const INVALID_ROW_INDEX = 'The column index was invalid';

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
  let dimensions;
  let gridDimensions;
  let cellDimensions;
  let gutterDimensions;

  const getDimensions = () => {
    dimensions = dimensions || saveDimensions();
    return dimensions;
  };

  const getGridDimensions = () => {
    gridDimensions = gridDimensions || saveGridDimensions();
    return gridDimensions;
  };

  const getCellDimensions = () => {
    cellDimensions = cellDimensions || saveCellDimensions();
    return cellDimensions;
  };

  const getGutterDimensions = () => {
    gutterDimensions = gutterDimensions || saveGutterDimensions();
    return gutterDimensions;
  };

  const canDeriveWidth = () => !!(cellHeight && rows);
  const canDeriveHeight = () => !!(cellWidth && columns);
  const deriveHeight = () => cellHeight * rows + gutterHeight * (rows - 1);
  const deriveWidth = () => cellWidth * columns + gutterWidth * (columns - 1);

  const canDeriveCellWidth = () => !!(getDimensions().width && columns);
  const canDeriveCellHeight = () => !!(getDimensions().height && rows);
  const deriveCellWidth = () =>
    (getDimensions().width - gutterWidth * (columns - 1)) / columns;
  const deriveCellHeight = () =>
    (getDimensions().height - gutterHeight * (rows - 1)) / rows;

  const canDeriveColumns = () => width && cellWidth;
  const canDeriveRows = () => height && cellHeight;
  const deriveColumns = () => getDimensions().width / cellWidth;
  const deriveRows = () => getDimensions().height / cellHeight;

  const validateGutters = (hGutter, vGutter) =>
    gutterWidth === 0 ||
    gutterWidth === hGutter ||
    (gutterHeight === 0 || gutterHeight === vGutter);

  const isValidColumnIndex = columnIndex =>
    columnIndex <= getGridDimensions().width - 1;
  const isValidRowIndex = rowIndex =>
    rowIndex <= getGridDimensions().height - 1;

  const topLeftPointForCell = (x, y) => {
    const xPos = (getCellDimensions().width + getGutterDimensions().width) * x;
    const yPos =
      (getCellDimensions().height + getGutterDimensions().height) * y;
    return createPoint(xPos, yPos);
  };

  /**
   * Create a dimensions object to represent the width and height of the grid.
   * If this information hasn't been explicly supplied, try to derive that info
   * from the other parameters supplied. If there is no way to assertain the
   * dimensions, throw an Error.
   * 
   * @returns {object} dimensions
   */
  const saveDimensions = () => {
    // If we only have width, we will need rowCount + cellHeight
    if (!width && !aspectRatio) {
      if (canDeriveWidth()) {
        width = deriveWidth();
      }
    }

    if (!height && !aspectRatio) {
      if (canDeriveHeight()) {
        height = deriveHeight();
      }
    }

    // If we don't have at least two params, throw an Error.
    if (validParamCount([width, height, aspectRatio]) < 2) {
      throw new Error(INVALID_PARAMS_MESSAGE);
    }

    return createDimensions({ width, height, aspectRatio });
  };

  const saveGridDimensions = () => {
    const c = columns || (canDeriveColumns() && deriveColumns());
    const r = rows || (canDeriveRows() && deriveRows());
    if (!r || !c) {
      throw new Error(CANT_DERIVE_GRID_DIMENSIONS_MESSAGE);
    }

    const rowParts = r.toString().split('.');
    const columnParts = c.toString().split('.');

    const wholeRows = Number(rowParts[0]);
    const wholeColumns = Number(columnParts[0]);

    if (!wholeRows > 0 || !wholeColumns > 0) {
      throw new Error(INVALID_GRID_DIMENSIONS_MESSAGE);
    }

    return createDimensions({ width: wholeColumns, height: wholeRows });
  };

  const saveCellDimensions = () => {
    const cW = cellWidth || (canDeriveCellWidth() && deriveCellWidth());
    const cH = cellHeight || (canDeriveCellHeight() && deriveCellHeight());

    if (!isNumber(cW) || !isNumber(cH)) {
      throw new Error(CANT_DERIVE_CELL_DIMENSIONS_MESSAGE);
    }

    return createDimensions({ width: cW, height: cH });
  };

  const saveGutterDimensions = () => {
    let gw = gutterWidth;
    let gh = gutterHeight;

    const remainingHSpace =
      getDimensions().width -
      getGridDimensions().width * getCellDimensions().width;
    const remainingVSpace =
      getDimensions().height -
      getGridDimensions().height * getCellDimensions().height;

    const hGutter = remainingHSpace / (getGridDimensions().width - 1);
    const vGutter = remainingVSpace / (getGridDimensions().height - 1);
    if (!validateGutters(hGutter, vGutter)) {
      throw new Error(INVALID_GUTTER_DIMENSIONS_MESSAGE);
    } else {
      gw = hGutter;
      gh = vGutter;
    }

    const d = createDimensions({
      width: gw,
      height: gh,
    });
    return d;
  };

  // Transfer gutter value to gutterWidth and gutterHeight if they aren't set
  if (!isNumber(gutterWidth)) gutterWidth = gutter || 0;
  if (!isNumber(gutterHeight)) gutterHeight = gutter || 0;

  // Guard against missing params that would cause recursion
  if ((!columns && !cellWidth) || (!rows && !cellHeight)) {
    throw new Error(INVALID_PARAMS_MESSAGE);
  }

  // Guard against cellWidth or cellHeight that would break grid;
  if ((columns && cellWidth) || (rows && cellHeight)) {
    if (
      columns * cellWidth > getDimensions().width ||
      rows * cellHeight > getDimensions().height
    ) {
      throw new Error(INVALID_PARAMS_MESSAGE);
    }
  }

  getDimensions();
  getGridDimensions();
  getCellDimensions();
  getGutterDimensions();

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const cellCount = () => getGridDimensions().area();

  const regionForCellAt = (x, y) => {
    if (!isNumber(x) || !isNumber(y)) {
      throw new Error(INVALID_PARAMS_TO_CELL_AT_MESSAGE);
    }

    if (x < 0 || x >= columns || y < 0 || y >= rows) {
      throw new Error(INVALID_CELL_INDEX_MESSAGE);
    }

    return createRegion(topLeftPointForCell(x, y), getCellDimensions());
  };

  const regionForColumns = (start, end) => {
    // Validate start
    if (
      isNil(start) ||
      !isPositiveInteger(start) ||
      !isValidColumnIndex(start)
    ) {
      throw new Error(INVALID_COLUMN_INDEX);
    }

    // Validate end
    if (!isNil(end) && (!isPositiveInteger(end) || !isValidColumnIndex(end))) {
      throw new Error(INVALID_COLUMN_INDEX);
    }

    const startCell = regionForCellAt(start, 0);
    const endCell = regionForCellAt(
      isNumber(end) ? end : start,
      getGridDimensions().height - 1
    );

    return regionForCells([startCell, endCell]);
  };

  const regionForRows = (start, end) => {
    // Validate start
    if (isNil(start) || !isPositiveInteger(start) || !isValidRowIndex(start)) {
      throw new Error(INVALID_COLUMN_INDEX);
    }

    // Validate end
    if (!isNil(end) && (!isPositiveInteger(end) || !isValidRowIndex(end))) {
      throw new Error(INVALID_COLUMN_INDEX);
    }

    const startCell = regionForCellAt(0, start);
    const endCell = regionForCellAt(
      getGridDimensions().width - 1,
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
  };
};

export default createGrid;
