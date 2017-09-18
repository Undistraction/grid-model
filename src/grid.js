import dimensions from './dimensions';
import cell from './cell';
import point from './point';
import { isNumber } from './validations';

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

const grid = (
  {
    width,
    height,
    aspectRatio,
    rows,
    columns,
    cellWidth,
    cellHeight,
    gutterWidth = 0,
    gutterHeight = 0,
    gutter,
  } = {}
) => {
  let _dimensions;
  let _gridDimensions;
  let _cellDimensions;
  let _gutterDimensions;

  const pointForCell = (x, y) => {
    const xPos = (getCellDimensions().width + getGutterDimensions().width) * x;
    const yPos =
      (getCellDimensions().height + getGutterDimensions().height) * y;
    return point(xPos, yPos);
  };

  const dimensionsForCell = (x, y) => {
    return getCellDimensions();
  };

  /**
   * 
   * @param {*} params Array of params to check
   * 
   * Filter out any params that haven't been set. 
   */
  const validParamCount = params => {
    return params.filter(function(x) {
      return x !== undefined && x !== null && x !== '';
    }).length;
  };

  const validateGutters = (hGutter, vGutter) =>
    gutterWidth === 0 ||
    gutterWidth === hGutter ||
    (gutterHeight === 0 || gutterHeight === vGutter);

  const canDeriveCellWidth = () => {
    return !!(getDimensions().width && columns);
  };

  const canDeriveCellHeight = () => {
    return !!(getDimensions().height && rows);
  };

  const deriveCellWidth = () =>
    (getDimensions().width - gutterWidth * (columns - 1)) / columns;

  const deriveCellHeight = () =>
    (getDimensions().height - gutterHeight * (rows - 1)) / rows;

  const canDeriveColumns = () => {
    return width && cellWidth;
  };

  const canDeriveRows = () => {
    return height && cellHeight;
  };

  const deriveColumns = () => getDimensions().width / cellWidth;
  const deriveRows = () => getDimensions().height / cellHeight;

  const rowsValid = rows => rows > 1;
  const columnsValid = columns => columns > 1;

  const getDimensions = () => {
    if (!_dimensions) _dimensions = saveDimensions();
    return _dimensions;
  };

  const getGridDimensions = () => {
    if (!_gridDimensions) _gridDimensions = saveGridDimensions();
    return _gridDimensions;
  };

  const getCellDimensions = () => {
    if (!_cellDimensions) _cellDimensions = saveCellDimensions();
    return _cellDimensions;
  };

  const getGutterDimensions = () => {
    if (!_gutterDimensions) _gutterDimensions = saveGutterDimensions();
    return _gutterDimensions;
  };

  const canDeriveWidth = () => !!(cellHeight && rows);
  const canDeriveHeight = () => !!(cellWidth && columns);
  const deriveHeight = () => cellHeight * rows + gutterHeight * (rows - 1);
  const deriveWidth = () => cellWidth * columns + gutterWidth * (columns - 1);

  /**
   * Create a dimensions object to represent the width and height of the grid.
   * If this information hasn't been explicly supplied, try to derive that info
   * from the other parameters supplied. If there is no way to assertain the
   * dimensions, throw an Error.
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

    return dimensions({ width, height, aspectRatio });
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

    if (!rowsValid(wholeRows) || !columnsValid(wholeColumns)) {
      throw new Error(INVALID_GRID_DIMENSIONS_MESSAGE);
    }

    return dimensions({ width: wholeColumns, height: wholeRows });
  };

  const saveCellDimensions = () => {
    const cW = cellWidth || (canDeriveCellWidth() && deriveCellWidth());
    const cH = cellHeight || (canDeriveCellHeight() && deriveCellHeight());

    if (!isNumber(cW) || !isNumber(cH)) {
      throw new Error(CANT_DERIVE_CELL_DIMENSIONS_MESSAGE);
    }

    return dimensions({ width: cW, height: cH });
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

    const d = dimensions({
      width: gw,
      height: gh,
    });
    return d;
  };

  // Transfer gutter value to gutterWidth and gutterHeight if they aren't set
  if (!gutterWidth) gutterWidth = gutter || 0;
  if (!gutterHeight) gutterHeight = gutter || 0;

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
      console.log(rows, cellHeight, getDimensions().height);
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

  const cellAt = (x, y) => {
    if (isNaN(x) || isNaN(y)) {
      throw new Error(INVALID_PARAMS_TO_CELL_AT_MESSAGE);
    }

    if (x < 0 || x >= columns || y < 0 || y >= rows) {
      throw new Error(INVALID_CELL_INDEX_MESSAGE);
    }

    const cellPoint = pointForCell(x, y);
    const cellDimensions = dimensionsForCell(x, y);
    return cell(cellPoint, cellDimensions);
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  return {
    get width() {
      return _dimensions.width;
    },
    get height() {
      return _dimensions.height;
    },
    get dimensions() {
      return _dimensions;
    },
    get aspectRatio() {
      return _dimensions.aspectRatio;
    },
    get rows() {
      return _gridDimensions.height;
    },
    get columns() {
      return _gridDimensions.width;
    },
    get gridDimensions() {
      return _gridDimensions;
    },
    get cellWidth() {
      return _cellDimensions.width;
    },
    get cellHeight() {
      return _cellDimensions.height;
    },
    get cellDimensions() {
      return _cellDimensions;
    },
    get gutterWidth() {
      return _gutterDimensions.width;
    },
    get gutterHeight() {
      return _gutterDimensions.height;
    },
    cellCount,
    cellAt,
  };
};

export default grid;
