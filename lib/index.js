'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _isNil = _interopDefault(require('lodash/isNil'));
var _isNumber = _interopDefault(require('lodash/isNumber'));
var _isInteger = _interopDefault(require('lodash/isInteger'));

var isPositiveNumber = function isPositiveNumber(value) {
  return _isNumber(value) && value >= 0;
};

var isPositiveInteger = function isPositiveInteger(value) {
  return _isInteger(value) && value >= 0;
};

/* eslint-disable import/prefer-default-export' */
var ERROR_PREFIX = '[Grid Model]';

var throwError = function throwError(message) {
  throw new Error(ERROR_PREFIX + ' ' + message);
};

var INCORRECT_NUMBER_OF_PARAMS_MESSAGE = 'You must supply exactly two of: width, height, aspectRatio';
var INVALID_PARAMS_MESSAGE$1 = 'Parameter was invalid:';

var throwInvalidParamError = function throwInvalidParamError(param, value) {
  throwError(INVALID_PARAMS_MESSAGE$1 + ' ' + param + ': ' + value);
};

var throwIncorrectNumberOfParamsError = function throwIncorrectNumberOfParamsError() {
  throwError(INCORRECT_NUMBER_OF_PARAMS_MESSAGE);
};

var validateArgs = function validateArgs(width, height, aspectRatio) {
  if (width && !_isNumber(width)) throwInvalidParamError('width', width);

  if (height && !_isNumber(height)) throwInvalidParamError('height', height);

  if (_isNumber(aspectRatio) && !isPositiveNumber(aspectRatio)) throwInvalidParamError('aspectRatio', aspectRatio);

  // Validate we have the params we need
  if ([width, height, aspectRatio].filter(function (x) {
    return _isNumber(x);
  }).length !== 2) {
    throwIncorrectNumberOfParamsError();
  }

  return {
    validatedWidth: _isNumber(width) ? width : height * aspectRatio,
    validatedHeight: _isNumber(height) ? height : width / aspectRatio,
    validatedAspectRatio: _isNumber(aspectRatio) ? aspectRatio : width / height
  };
};

var createDimensions = function createDimensions(_ref) {
  var width = _ref.width,
      height = _ref.height,
      aspectRatio = _ref.aspectRatio;

  // Validate supplied params are valid
  var _validateArgs = validateArgs(width, height, aspectRatio),
      validatedWidth = _validateArgs.validatedWidth,
      validatedHeight = _validateArgs.validatedHeight,
      validatedAspectRatio = _validateArgs.validatedAspectRatio;

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  var area = function area() {
    return width * height;
  };

  return {
    get width() {
      return validatedWidth;
    },
    get height() {
      return validatedHeight;
    },
    get aspectRatio() {
      return validatedAspectRatio;
    },
    area: area
  };
};

var INVALID_PARAMS_MESSAGE$2 = 'Params were invalid';

var validateArgs$2 = function validateArgs(x, y) {
  if (!_isNumber(x) || !_isNumber(y)) {
    throwError(INVALID_PARAMS_MESSAGE$2);
  }
  return { validatedX: x, validatedY: y };
};

var createPoint = function createPoint(x, y) {
  var _validateArgs = validateArgs$2(x, y),
      validatedX = _validateArgs.validatedX,
      validatedY = _validateArgs.validatedY;

  return {
    get x() {
      return validatedX;
    },
    get y() {
      return validatedY;
    }
  };
};

var INVALID_PARAMS_ERROR_MESSAGE = 'You must supply a point object and size object';

var validateArgs$1 = function validateArgs(origin, dimensions) {
  if (!origin || !dimensions) {
    throwError(INVALID_PARAMS_ERROR_MESSAGE);
  }
  return { validatedOrigin: origin, validatedDimensions: dimensions };
};

var calculatePoints = function calculatePoints(top, right, bottom, left) {
  return {
    topLeftPoint: createPoint(left, top),
    topRightPoint: createPoint(right, top),
    bottomRightPoint: createPoint(right, bottom),
    bottomLeftPoint: createPoint(left, bottom)
  };
};

var calculateBounds = function calculateBounds(origin, dimensions) {
  return {
    top: origin.y,
    right: origin.x + dimensions.width,
    bottom: origin.y + dimensions.height,
    left: origin.x
  };
};

var createRegion = function createRegion(origin, dimensions) {
  validateArgs$1(origin, dimensions);

  var _calculateBounds = calculateBounds(origin, dimensions),
      top = _calculateBounds.top,
      right = _calculateBounds.right,
      bottom = _calculateBounds.bottom,
      left = _calculateBounds.left;

  var _calculatePoints = calculatePoints(top, right, bottom, left),
      topLeftPoint = _calculatePoints.topLeftPoint,
      topRightPoint = _calculatePoints.topRightPoint,
      bottomRightPoint = _calculatePoints.bottomRightPoint,
      bottomLeftPoint = _calculatePoints.bottomLeftPoint;

  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    topLeftPoint: topLeftPoint,
    topRightPoint: topRightPoint,
    bottomRightPoint: bottomRightPoint,
    bottomLeftPoint: bottomLeftPoint,
    dimensions: dimensions
  };
};

var MISSING_GRID_MESSAGE = 'You must supply a grid';

var createIterator = function createIterator(grid) {
  if (!grid) {
    throw new Error(MISSING_GRID_MESSAGE);
  }

  var x = 0;
  var y = 0;
  var columns = grid.columns;
  var rows = grid.rows;


  var next = function next() {
    var thisX = x;
    var thisY = y;

    if (x === 0 && y === rows) return { done: true };

    if (x + 1 === columns) {
      x = 0;
      y += 1;
    } else {
      x += 1;
    }
    return {
      value: grid.regionForCellAt(thisX, thisY),
      done: false
    };
  };

  return {
    next: next
  };
};

// -----------------------------------------------------------------------------
// Error Messages
// -----------------------------------------------------------------------------

var INVALID_PARAMS_MESSAGE = "You didn't supply sufficient params to derive a valid grid";

var CONFLICTING_PARAMS_MESSAGE = 'You supplied params that cannot be reconciled to a valid grid';

var ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE = 'Zero is not a valid value for rows or columns';

var INVALID_COLUMN_INDEX_MESSAGE = 'The column index supplied was invalid';

var INVALID_ROW_INDEX_MESSAGE = 'The row index supplied was invalid';

// -----------------------------------------------------------------------------
// Utility
// -----------------------------------------------------------------------------

/**
 * Use the extents of all the supplied cells to calculate a region that includes
 * them all.
 * 
 * @param {array} cells An array of cells. 
 * @returns {object} Region encompassing all supplied cells.
 */
var regionForCells = function regionForCells(cells) {
  var tlX = cells.map(function (cell) {
    return cell.topLeftPoint.x;
  }).reduce(function (acc, cur) {
    return cur < acc ? cur : acc;
  }, Infinity);
  var tlY = cells.map(function (cell) {
    return cell.topLeftPoint.y;
  }).reduce(function (acc, cur) {
    return cur < acc ? cur : acc;
  }, Infinity);
  var brX = cells.map(function (cell) {
    return cell.bottomRightPoint.x;
  }).reduce(function (acc, cur) {
    return cur > acc ? cur : acc;
  }, 0);
  var brY = cells.map(function (cell) {
    return cell.bottomRightPoint.y;
  }).reduce(function (acc, cur) {
    return cur > acc ? cur : acc;
  }, 0);

  var regionTopLeftPoint = createPoint(tlX, tlY);
  var regionDimensions = createDimensions({
    width: brX - tlX,
    height: brY - tlY
  });

  return createRegion(regionTopLeftPoint, regionDimensions);
};

/**
 * 
 * Filter out any params that haven't been set.  
 * 
 * @param {array} params Array of params to check.
 * @returns {array} of params that have been set.
 */
var validParamCount = function validParamCount(params) {
  return params.filter(function (param) {
    return !_isNil(param) && param !== '';
  }).length;
};

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
 */
var validateParams = function validateParams(width, height, aspectRatio, rows, columns, cellWidth, cellHeight) {
  // Zero values aren't valid
  if (columns === 0 || rows === 0) {
    throwError(ZERO_VALUES_FOR_GRID_DIMENSIONS_MESSAGE);
  }

  // Guard against cellWidth or cellHeight that would break grid;
  if (_isNumber(columns) && _isNumber(cellWidth) && _isNumber(width) || _isNumber(rows) && _isNumber(cellHeight) && _isNumber(height)) {
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
 * @returns {boolean} Is there enought information to derive a width for the grid?
 */
var canDeriveWidth = function canDeriveWidth(cellHeight, rows) {
  return !!(_isNumber(cellHeight) && _isNumber(rows));
};

/**
 * Check the supplied arguments to see if they can be used to derive a height
 * for the grid.
 * 
 * @param {number} cellWidth The width of a cell in the grid.
 * @param {number} columns The number of columns in the grid.
 * 
 * @returns {boolean} Is there enought information to derive a height for the grid?
 */
var canDeriveHeight = function canDeriveHeight(cellWidth, columns) {
  return !!(_isNumber(cellWidth) && _isNumber(columns));
};

/**
 * Calculate the width of the grid using the supplied values.
 * 
 * @param {number} columns The number of columns in the grid.
 * @param {number} cellWidth The width of a cell in the grid.
 * @param {number} gutterWidth The width of the gutters in the grid.
 * 
 * @returns {number} The calculated width of the grid.
 */
var deriveWidth = function deriveWidth(columns, cellWidth) {
  var gutterWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return cellWidth * columns + gutterWidth * (columns - 1);
};

/**
 * Calculate the height of the grid using the supplied values.
 * 
 * @param {number} rows The number of rows in the grid.
 * @param {number} cellHeight The height of a cell in the grid.
 * @param {number} gutterHeight The height of the gutters in the grid.
 * 
 * @returns {number} The calculated height of the grid.
 */
var deriveHeight = function deriveHeight(rows, cellHeight) {
  var gutterHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return cellHeight * rows + gutterHeight * (rows - 1);
};

/**
 * Calculate the width of the cells in the grid using the supplied values.
 * 
 * @param {number} width The height of the grid.
 * @param {number} gutterWidth The width of a gutter in the grid.
 * @param {number} columns The number of columns in the grid.
 * 
 * @returns {number} The width of cells in the grid.
 */
var deriveCellWidth = function deriveCellWidth(width) {
  var gutterWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var columns = arguments[2];
  return (width - gutterWidth * (columns - 1)) / columns;
};

/**
 * Calculate the height of the cells in the grid using the supplied values.
 * 
 * @param {number} height The height of the grid.
 * @param {number} gutterHeight The height of a gutter in the grid.
 * @param {number} rows The number of rows in the grid.
 * 
 * @returns {number} The height of cells in the grid.
 */
var deriveCellHeight = function deriveCellHeight(height) {
  var gutterHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var rows = arguments[2];
  return (height - gutterHeight * (rows - 1)) / rows;
};

/**
 * Check the supplied arguments to see if they can be used to derive the number
 * of columns in the grid. 
 * @param {number} width The width of the grid.
 * @param {*} cellWidth The width of a cell in the grid.
 * 
 * @returns {boolean} Is there enought information to derive a number of columns
 * in the grid?
 */
var canDeriveColumns = function canDeriveColumns(width, cellWidth) {
  return !!(_isNumber(width) && _isNumber(cellWidth));
};

/**
 * Check the supplied arguments to see if they can be used to derive the number
 * of rows in the grid. 
 * @param {number} height The height of the grid.
 * @param {*} cellHeight The height of a cell in the grid.
 * 
 * @returns {boolean} Is there enought information to derive a number of rows
 * in the grid?
 */
var canDeriveRows = function canDeriveRows(height, cellHeight) {
  return !!(_isNumber(height) && _isNumber(cellHeight));
};

/**
 * Calculate the number of columns in the grid using the supplied argumnets.
 * 
 * @param {number} width The width of the grid.
 * @param {number} cellWidth The width of a cell in the grid.
 * 
 * @returns {number} The number of columns in the grid.
 */
var deriveColumns = function deriveColumns(width, cellWidth) {
  return width / cellWidth;
};

/**
 * Calculate the number of rows in the grid using the supplied argumnets.
 * 
 * @param {number} height The height of the grid.
 * @param {number} cellHeight The height of a cell in the grid.
 * 
 * @returns {number} The number of rows in the grid.
 */
var deriveRows = function deriveRows(height, cellHeight) {
  return height / cellHeight;
};

/**
 * Check if a column of the supplied index is valid for this grid.
 * 
 * @param {number} columnIndex The (zero-based) position of the column.
 * @param {number} totalColumns The total number of columns.
 * 
 * @returns {boolean} Does a column of the supplied index exist in this grid?
 */
var columnExists = function columnExists(columnIndex, totalColumns) {
  return columnIndex <= totalColumns - 1;
};

/**
 * Check if a row of the supplied index is valid for this grid.
 * 
 * @param {number} rowIndex The (zero-based) position of the row.
 * @param {number} totalRows The total number of rows.
 * 
 * @returns {boolean} Does a row of the supplied index exist in this grid?
 */
var rowExists = function rowExists(rowIndex, totalRows) {
  return rowIndex <= totalRows - 1;
};

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
 */
var createTopLeftPointForCell = function createTopLeftPointForCell(x, y, cellWidth, cellHeight, gutterWidth, gutterHeight) {
  var xPos = (cellWidth + gutterWidth) * x;
  var yPos = (cellHeight + gutterHeight) * y;
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
 */
var saveDimensions = function saveDimensions(width, height, aspectRatio, columns, rows, cellWidth, cellHeight, gutterWidth, gutterHeight) {
  if (!_isNumber(width) && !_isNumber(aspectRatio)) {
    if (canDeriveWidth(cellHeight, rows)) {
      width = deriveWidth(columns, cellWidth, gutterWidth);
    }
  }

  if (!_isNumber(height) && !_isNumber(aspectRatio)) {
    if (canDeriveHeight(cellWidth, columns)) {
      height = deriveHeight(rows, cellHeight, gutterHeight);
    }
  }

  // If we don't have at least two params, throw an Error.
  if (validParamCount([width, height, aspectRatio]) < 2) {
    throwError(INVALID_PARAMS_MESSAGE);
  }

  return createDimensions({ width: width, height: height, aspectRatio: aspectRatio });
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
 */
var saveMatrixDimensions = function saveMatrixDimensions(columns, rows, dimensions, cellWidth, cellHeight) {
  var c = _isNumber(columns) ? columns : canDeriveColumns(dimensions.width, cellWidth) && deriveColumns(dimensions.width, cellWidth);
  var r = _isNumber(rows) ? rows : canDeriveRows(dimensions.height, cellHeight) && deriveRows(dimensions.height, cellHeight);

  if (!r || !c) {
    throwError(INVALID_PARAMS_MESSAGE);
  }

  var rowParts = r.toString().split('.');
  var columnParts = c.toString().split('.');

  var wholeRows = Number(rowParts[0]);
  var wholeColumns = Number(columnParts[0]);

  return createDimensions({
    width: wholeColumns,
    height: wholeRows
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
 */
var saveCellDimensions = function saveCellDimensions(cellWidth, cellHeight, gutterWidth, gutterHeight, dimensions, matrixDimensions) {
  var width = _isNumber(cellWidth) ? cellWidth : deriveCellWidth(dimensions.width, gutterWidth, matrixDimensions.width);
  var height = _isNumber(cellHeight) ? cellHeight : deriveCellHeight(dimensions.height, gutterHeight, matrixDimensions.height);

  return createDimensions({ width: width, height: height });
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
 */
var saveGutterDimensions = function saveGutterDimensions(gutterWidth, gutterHeight, dimensions, matrixDimensions, cellDimensions) {
  var remainingHSpace = dimensions.width - matrixDimensions.width * cellDimensions.width;
  var remainingVSpace = dimensions.height - matrixDimensions.height * cellDimensions.height;

  var calculatedGutterWidth = remainingHSpace / (matrixDimensions.width - 1);
  var calcualtedGutterHeight = remainingVSpace / (matrixDimensions.height - 1);

  if (matrixDimensions.width > 1 && _isNumber(gutterWidth) && gutterWidth !== calculatedGutterWidth || matrixDimensions.height > 1 && _isNumber(gutterHeight) && gutterHeight !== calcualtedGutterHeight) {
    throwError(CONFLICTING_PARAMS_MESSAGE);
  }

  return createDimensions({
    width: calculatedGutterWidth,
    height: calcualtedGutterHeight
  });
};

/**
 * Validate the supplied column index, making sure it exists in the grid.
 * 
 * @param {number} index The (zero based) position of the column in the grid.
 * @param {number} total The total number of columns in the grid.
 * 
 * @returns {boolean} Does the supplied column index exist.
 */
var validateColumnIndex = function validateColumnIndex(index, total) {
  if (_isNil(index) || !isPositiveInteger(index) || !columnExists(index, total)) {
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
 */
var validateRowIndex = function validateRowIndex(index, total) {
  if (_isNil(index) || !isPositiveInteger(index) || !rowExists(index, total)) {
    throwError(INVALID_ROW_INDEX_MESSAGE);
  }
};

// -----------------------------------------------------------------------------
// Entry
// -----------------------------------------------------------------------------

var createGrid = function createGrid() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      width = _ref.width,
      height = _ref.height,
      aspectRatio = _ref.aspectRatio,
      rows = _ref.rows,
      columns = _ref.columns,
      cellWidth = _ref.cellWidth,
      cellHeight = _ref.cellHeight,
      gutterWidth = _ref.gutterWidth,
      gutterHeight = _ref.gutterHeight,
      gutter = _ref.gutter;

  validateParams(width, height, aspectRatio, rows, columns, cellWidth, cellHeight, gutterWidth, gutterHeight, gutter);

  // Transfer gutter value to gutterWidth and gutterHeight if they aren't set

  if (!_isNumber(gutterWidth) && _isNumber(gutter)) gutterWidth = gutter;
  if (!_isNumber(gutterHeight) && _isNumber(gutter)) gutterHeight = gutter;

  var dimensions = saveDimensions(width, height, aspectRatio, columns, rows, cellWidth, cellHeight, gutterWidth, gutterHeight);

  var matrixDimensions = saveMatrixDimensions(columns, rows, dimensions, cellWidth, cellHeight);

  var cellDimensions = saveCellDimensions(cellWidth, cellHeight, gutterWidth, gutterHeight, dimensions, matrixDimensions);
  var gutterDimensions = saveGutterDimensions(gutterWidth, gutterHeight, dimensions, matrixDimensions, cellDimensions);

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  var cellCount = function cellCount() {
    return matrixDimensions.area();
  };

  var regionForCellAt = function regionForCellAt(columnIndex, rowIndex) {
    validateColumnIndex(columnIndex, matrixDimensions.width);
    validateRowIndex(rowIndex, matrixDimensions.height);

    return createRegion(createTopLeftPointForCell(columnIndex, rowIndex, cellDimensions.width, cellDimensions.height, gutterDimensions.width, gutterDimensions.height), cellDimensions);
  };

  var regionForCellsAt = function regionForCellsAt(startColumnIndex, startRowIndex, endColumnIndex, endRowIndex) {
    var startCell = regionForCellAt(startColumnIndex, startRowIndex);
    var endCell = regionForCellAt(endColumnIndex, endRowIndex);
    return regionForCells([startCell, endCell]);
  };

  var regionForColumns = function regionForColumns(start, end) {
    var startCell = regionForCellAt(start, 0);

    var endCell = regionForCellAt(!_isNil(end) ? end : start, matrixDimensions.height - 1);

    return regionForCells([startCell, endCell]);
  };

  var regionForRows = function regionForRows(start, end) {
    var startCell = regionForCellAt(0, start);

    var endCell = regionForCellAt(matrixDimensions.width - 1, !_isNil(end) ? end : start);

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
    cellCount: cellCount,
    regionForCellAt: regionForCellAt,
    regionForColumns: regionForColumns,
    regionForRows: regionForRows,
    regionForCellsAt: regionForCellsAt,
    // Note: Don't use an arrow function as we want it to bind to this object.
    getIterator: function getIterator() {
      return createIterator(this);
    }
  };
};

exports.createGrid = createGrid;
exports.createRegion = createRegion;
exports.createPoint = createPoint;
exports.createDimensions = createDimensions;
exports.createIterator = createIterator;
