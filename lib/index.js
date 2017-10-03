'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _partial = _interopDefault(require('lodash/partial'));
var _isNil = _interopDefault(require('lodash/isNil'));
var _isNumber = _interopDefault(require('lodash/isNumber'));
var _isInteger = _interopDefault(require('lodash/isInteger'));
var _lt = _interopDefault(require('lodash/lt'));
var _gt = _interopDefault(require('lodash/gt'));
var _curryRight = _interopDefault(require('lodash/curryRight'));
var _curry = _interopDefault(require('lodash/curry'));
var _subtract = _interopDefault(require('lodash/subtract'));
var _add = _interopDefault(require('lodash/add'));

var greaterThanZero = function greaterThanZero(value) {
  return value >= 0;
};

/**
 * Is the value a number followed by a percent sign, for example '44%'.
 * 
 * @param {string} value The value to check.
 * 
 * @returns {boolan} Was the value valid?
 * @private
 */


/**
 * Is the value a number greater than zero.
 * 
 * @param {string} value The value to check.
 * 
 * @returns {boolan} Was the value valid?
 * @private
 */
var isPositiveNumber = function isPositiveNumber(value) {
  return _isNumber(value) && greaterThanZero(value);
};

/**
 * Is the value an integer greater than zero.
 * 
 * @param {string} value The value to check.
 * 
 * @returns {boolan} Was the value valid?
 * @private
 */
var isPositiveInteger = function isPositiveInteger(value) {
  return _isInteger(value) && greaterThanZero(value);
};

/* eslint-disable import/prefer-default-export' */
var ERROR_PREFIX = '[Grid Model]';

/**
 * Throw an error, adding a prefix so it is clear which library the error
 * originated from.
 * 
 * @param {string} message The error message.
 * 
 * @returns {undefined}
 * @private
 */
var throwError = function throwError(message) {
  throw new Error(ERROR_PREFIX + ' ' + message);
};

var INCORRECT_NUMBER_OF_PARAMS_MESSAGE = 'You must supply exactly two of: width, height, aspectRatio';
var INVALID_PARAMS_MESSAGE$1 = 'Parameter was invalid:';

/**
 * Throw an error due to params being invalid.
 * 
 * @param {string} param The name of the invalid param.
 * @param {value} value The value of the invalid param.
 * 
 * @returns {undefined}
 * @private
 */
var throwInvalidParamError = function throwInvalidParamError(param, value) {
  throwError(INVALID_PARAMS_MESSAGE$1 + ' ' + param + ': ' + value);
};

/**
 * Validate the supplied arguments. Exactly two values must be supplied. The
 * third will be calculated.
 * 
 * @param {number} width The width.
 * @param {number} height The height.
 * @param {number} aspectRatio The aspectRatio.
 * 
 * @returns {object} An object containing the validated arguments.
 * @private
 */
var validateArgs = function validateArgs(width, height, aspectRatio) {
  if (width && !_isNumber(width)) throwInvalidParamError('width', width);

  if (height && !_isNumber(height)) throwInvalidParamError('height', height);

  if (_isNumber(aspectRatio) && !isPositiveNumber(aspectRatio)) throwInvalidParamError('aspectRatio', aspectRatio);

  // Validate we have the params we need
  if ([width, height, aspectRatio].filter(function (x) {
    return _isNumber(x);
  }).length !== 2) {
    throwError(INCORRECT_NUMBER_OF_PARAMS_MESSAGE);
  }

  return {
    validatedWidth: _isNumber(width) ? width : height * aspectRatio,
    validatedHeight: _isNumber(height) ? height : width / aspectRatio,
    validatedAspectRatio: _isNumber(aspectRatio) ? aspectRatio : width / height
  };
};

/**
 * Create a dimensions object. Only two of the three possible params can be
 * supplied. The third will be calculated from the others.
 * 
 * @param {object} Object containing params.
 * @param {number} width The width dimension.
 * @param {number} height The height dimension.
 * @param {number} aspectRatio The aspectRatio of the dimensions.
 * 
 * @returns {object} A dimensions object.
 * @private
 */
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

  /**
   * Return the area of the dimensions.
   * 
   * @returns {number} The width * the height.
   */


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

/**
 * Validate the supplied arguments.
 * 
 * @param {number} x The x coordinate.
 * @param {number} y  The y coordinate.
 * 
 * @returns {object} An object containing the validated values.
 * @private
 */
var validateArgs$2 = function validateArgs(x, y) {
  if (!_isNumber(x) || !_isNumber(y)) {
    throwError(INVALID_PARAMS_MESSAGE$2);
  }
};

/**
 * Create a point object represting cartesian coordinates.
 * 
 * @param {any} x The x coordinate.
 * @param {any} y The y coordinate.
 * 
 * @returns {object} The point object.
 */
var createPoint = function createPoint(x, y) {
  validateArgs$2(x, y);

  return {
    get x() {
      return x;
    },
    get y() {
      return y;
    }
  };
};

/** @module Region */

var INVALID_PARAMS_ERROR_MESSAGE = 'You must supply a point object and size object';

/**
 * Validate the supplied arguments.
 * 
 * @param {object} origin A point object.
 * 
 * @param {any} dimensions A dimensions object.
 * 
 * @returns {undefined}
 * @private
 */
var validateArgs$1 = function validateArgs(origin, dimensions) {
  if (!origin || !dimensions) {
    throwError(INVALID_PARAMS_ERROR_MESSAGE);
  }
};

/**
 * Create an object keyed with points objects to store each corner of the
 * region.
 * 
 * @param {number} top The y-coordinate of the topmost point in the region.
 * @param {number} right The x-coordinate of the righmost point in the region.
 * @param {number} bottom  The y-coordinate of the bottommost point in the
 * region.
 * @param {number} left  The x-coordinate of the leftmost point in the region.
 * 
 * @returns {object} An object containing points objects for each corner of the
 * region.
 * @private
 */
var calculatePoints = function calculatePoints(top, right, bottom, left) {
  return {
    topLeftPoint: createPoint(left, top),
    topRightPoint: createPoint(right, top),
    bottomRightPoint: createPoint(right, bottom),
    bottomLeftPoint: createPoint(left, bottom)
  };
};

/**
 * Calculate the bounds of a region using a top-leftmost point and
 * dimensions.
 * 
 * @param {object} origin A point object.
 * @param {dimensions} dimensions A dimensions object.
 * 
 * @returns {object} An object containing th bounds for each edge of the region.
 * @private
 */
var calculateBounds = function calculateBounds(origin, dimensions) {
  return {
    top: origin.y,
    right: origin.x + dimensions.width,
    bottom: origin.y + dimensions.height,
    left: origin.x
  };
};

/**
 * Create a region object, representing a position an dimensions with a
 * cartesian coordinate sytem.
 * 
 * @param {object} origin A point object.
 * @param {object} dimensions A dimensions object.
 * 
 * @returns {object} A region object.
 */
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

var print = function print(message) {
  // eslint-disable-next-line no-console
  console.info(message);
};

var printDivider = function printDivider() {
  print('--------------------------------------------------------------------');
};

/**
 * Increment the supplied value by one.
 * 
 * @param {number} index The value to be incremented.
 * 
 * @return {number} The incremented value.
 * @private
 */
var increment = _curry(_add)(1);

/**
 * Decrement the supplied value by one.
 * 
 * @param {number} value The value to be decremented.
 * 
 * @return {number} The decremented value.
 * @private
 */
var decrement = _curryRight(_subtract)(1);

/**
 * Return the largest of the two supplied values.
 * 
 * @param {number} x The first value to compare.
 * @param {number} y The second value to compare.
 * 
 * @returns {number} The greatest value.
 */
var keepGreatest = function keepGreatest(x, y) {
  return _gt(y, x) ? y : x;
};

/**
 * Return the smallest of the two supplied values.
 * 
 * @param {number} x The first value to compare.
 * @param {number} y The second value to compare.
 * 
 * 
 * @returns {number} The greatest value.
 */
var keepSmallest = function keepSmallest(x, y) {
  return _lt(y, x) ? y : x;
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
// Logging
// -----------------------------------------------------------------------------

var printInfo = function printInfo(dimensions, matrixDimensions, cellDimensions, gutterDimensions) {
  printDivider();
  print('Grid');
  printDivider();
  print('Width:              ' + dimensions.width);
  print('Height:             ' + dimensions.height);
  print('Aspect Ratio:       ' + dimensions.aspectRatio);
  print('Columns:            ' + matrixDimensions.columns);
  print('Rows:               ' + matrixDimensions.rows);
  print('Cell Width:         ' + cellDimensions.cellWidth);
  print('Cell Height:        ' + cellDimensions.cellHeight);
  print('Gutter Width:       ' + gutterDimensions.gutterWidth);
  print('Gutter Height:      ' + gutterDimensions.gutterHeight);
  print('Total cells:        ' + matrixDimensions.area());
  printDivider();
};

// -----------------------------------------------------------------------------
// Utility
// -----------------------------------------------------------------------------

/**
 * Use the extents of all the supplied cells to calculate a region that includes
 * them all.
 * 
 * @param {array} cells An array of cells. 
 * @returns {object} Region encompassing all supplied cells.
 * @private
 */
var regionForCells = function regionForCells(cells) {
  var tlX = cells.map(function (cell) {
    return cell.topLeftPoint.x;
  }).reduce(keepSmallest, Infinity);
  var tlY = cells.map(function (cell) {
    return cell.topLeftPoint.y;
  }).reduce(keepSmallest, Infinity);
  var brX = cells.map(function (cell) {
    return cell.bottomRightPoint.x;
  }).reduce(keepGreatest, 0);
  var brY = cells.map(function (cell) {
    return cell.bottomRightPoint.y;
  }).reduce(keepGreatest, 0);

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
 * @private
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
 * @private
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
 * @returns {boolean} Is there enought information to derive a width for the
 * grid?
 * @private
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
 * @returns {boolean} Is there enought information to derive a height for the
 * grid?
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
 */
var saveMatrixDimensions = function saveMatrixDimensions(columns, rows, dimensions, cellWidth, cellHeight) {
  var resolvedColumns = _isNumber(columns) ? columns : canDeriveColumns(dimensions.width, cellWidth) && deriveColumns(dimensions.width, cellWidth);
  var resolvedRows = _isNumber(rows) ? rows : canDeriveRows(dimensions.height, cellHeight) && deriveRows(dimensions.height, cellHeight);

  if (!resolvedColumns || !resolvedRows) {
    throwError(INVALID_PARAMS_MESSAGE);
  }

  var rowParts = resolvedRows.toString().split('.');
  var columnParts = resolvedColumns.toString().split('.');

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
 * @private
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
 * @private
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
 * @private
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
 * @private
 */
var validateRowIndex = function validateRowIndex(index, total) {
  if (_isNil(index) || !isPositiveInteger(index) || !rowExists(index, total)) {
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

  /**
   * Get the region for the cell at the supplied indexes.
   * 
   * @param {number} columnIndex The column index of the cell.
   * @param {number} rowIndex  The row index of the cell.
   * 
   * @returns {object} A region object for the cell at the supplied indexes.
   */
  var regionForCellAt = function regionForCellAt(columnIndex, rowIndex) {
    validateColumnIndex(columnIndex, matrixDimensions.width);
    validateRowIndex(rowIndex, matrixDimensions.height);

    return createRegion(createTopLeftPointForCell(columnIndex, rowIndex, cellDimensions.width, cellDimensions.height, gutterDimensions.width, gutterDimensions.height), cellDimensions);
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
  var regionForCellsAt = function regionForCellsAt(startColumnIndex, startRowIndex, endColumnIndex, endRowIndex) {
    var startCell = regionForCellAt(startColumnIndex, startRowIndex);
    var endCell = regionForCellAt(endColumnIndex, endRowIndex);
    return regionForCells([startCell, endCell]);
  };

  /**
   * Get the region encompassing the column at the supplied index.
   * 
   * @param {number} startIndex The index of the  column.
   *  
   * @returns {object} A region object ecompassing the column at the supplied
   * index.
   */
  var regionForColumn = function regionForColumn(startIndex) {
    var startCell = regionForCellAt(startIndex, 0);
    var endCell = regionForCellAt(startIndex, matrixDimensions.height - 1);

    return regionForCells([startCell, endCell]);
  };

  /**
   * Get the region encompassing one or more consecutive columns.
   * 
   * @param {number} startIndex The index of the first column.
   * @param {number} endIndex The index of the last column.
   *  
   * @returns {object} A region object ecompassing all columns between the
   * supplied indexes.
   */
  var regionForColumns = function regionForColumns(startIndex, endIndex) {
    var startCell = regionForCellAt(startIndex, 0);

    var endCell = regionForCellAt(endIndex, matrixDimensions.height - 1);

    return regionForCells([startCell, endCell]);
  };

  /**
   * Get the region encompassing the row at the supplied index.
   * 
   * @param {number} startIndex The index of the row.
   *  
   * @returns {object} A region object ecompassing the row at the supplied
   * index.
   */
  var regionForRow = function regionForRow(startIndex) {
    var startCell = regionForCellAt(0, startIndex);

    var endCell = regionForCellAt(matrixDimensions.width - 1, startIndex);

    return regionForCells([startCell, endCell]);
  };

  /**
   * Get the region encompassing one or more consecutive rows.
   * 
   * @param {number} startIndex The index of the first row.
   * @param {number} endIndex The index of the last row.
   *  
   * @returns {object} A region object ecompassing all rows between the
   * supplied indexes.
   */
  var regionForRows = function regionForRows(startIndex, endIndex) {
    var startCell = regionForCellAt(0, startIndex);
    var endCell = regionForCellAt(matrixDimensions.width - 1, endIndex);

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
    info: _partial(printInfo, dimensions, matrixDimensions, cellDimensions, gutterDimensions),

    /**
     * Get the number of cells in the grid (columns * rows)
     * 
     * @returns {number} the number of cells in the grid.
     */
    cellCount: matrixDimensions.area,
    regionForCellAt: regionForCellAt,
    regionForColumn: regionForColumn,
    regionForColumns: regionForColumns,
    regionForRow: regionForRow,
    regionForRows: regionForRows,
    regionForCellsAt: regionForCellsAt
    // Note: Don't use an arrow function as we want it to bind to this object.
  };
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();













var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/** @module Iterator */

var MISSING_GRID_MESSAGE = '[Grid Iterator] You must supply a grid';
var MISSING_STRATEGY_MESSAGE = '[Grid Iterator] You must supply a strategy';

/**
 * Create an iterator to iterate over the cells of a grid. The iterator will use
 * the `interatorStrategy` of the grid to decide how to iterate, for example
 * should it iterate forward or backwards, vertically or horizontally?
 * 
 *  @param {object} strategy Object represeting the strategy to use for
 * iteration.
 * @param {object} grid Object represeting the grid to iterate over.
 * 
 * @returns {object} An iterator object with a single `next` property.
 */
var createIterator = function createIterator(strategy, grid) {
  if (!strategy) {
    throw new Error(MISSING_STRATEGY_MESSAGE);
  }
  if (!grid) {
    throw new Error(MISSING_GRID_MESSAGE);
  }

  return defineProperty({
    next: strategy(grid.columns, grid.rows)
  }, Symbol.iterator, function () {
    return this;
  });
};

exports.createGrid = createGrid;
exports.createRegion = createRegion;
exports.createPoint = createPoint;
exports.createDimensions = createDimensions;
exports.createIterator = createIterator;
