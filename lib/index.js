'use strict';

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil$1(value) {
  return value == null;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber$1(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && baseGetTag(value) == numberTag);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;
var MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

var isPositiveNumber = function isPositiveNumber(value) {
  return isNumber$1(value) && value >= 0;
};

var isPositiveInteger = function isPositiveInteger(value) {
  return isInteger(value) && value >= 0;
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
  if (width && !isNumber$1(width)) throwInvalidParamError('width', width);

  if (height && !isNumber$1(height)) throwInvalidParamError('height', height);

  if (isNumber$1(aspectRatio) && !isPositiveNumber(aspectRatio)) throwInvalidParamError('aspectRatio', aspectRatio);

  // Validate we have the params we need
  if ([width, height, aspectRatio].filter(function (x) {
    return isNumber$1(x);
  }).length !== 2) {
    throwIncorrectNumberOfParamsError();
  }

  return {
    validatedWidth: isNumber$1(width) ? width : height * aspectRatio,
    validatedHeight: isNumber$1(height) ? height : width / aspectRatio,
    validatedAspectRatio: isNumber$1(aspectRatio) ? aspectRatio : width / height
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
  if (!isNumber$1(x) || !isNumber$1(y)) {
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
    return !isNil$1(param) && param !== '';
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
  if (isNumber$1(columns) && isNumber$1(cellWidth) && isNumber$1(width) || isNumber$1(rows) && isNumber$1(cellHeight) && isNumber$1(height)) {
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
  return !!(isNumber$1(cellHeight) && isNumber$1(rows));
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
  return !!(isNumber$1(cellWidth) && isNumber$1(columns));
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
  return !!(isNumber$1(width) && isNumber$1(cellWidth));
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
  return !!(isNumber$1(height) && isNumber$1(cellHeight));
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
  if (!isNumber$1(width) && !isNumber$1(aspectRatio)) {
    if (canDeriveWidth(cellHeight, rows)) {
      width = deriveWidth(columns, cellWidth, gutterWidth);
    }
  }

  if (!isNumber$1(height) && !isNumber$1(aspectRatio)) {
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
  var c = isNumber$1(columns) ? columns : canDeriveColumns(dimensions.width, cellWidth) && deriveColumns(dimensions.width, cellWidth);
  var r = isNumber$1(rows) ? rows : canDeriveRows(dimensions.height, cellHeight) && deriveRows(dimensions.height, cellHeight);

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
  var width = isNumber$1(cellWidth) ? cellWidth : deriveCellWidth(dimensions.width, gutterWidth, matrixDimensions.width);
  var height = isNumber$1(cellHeight) ? cellHeight : deriveCellHeight(dimensions.height, gutterHeight, matrixDimensions.height);

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

  if (matrixDimensions.width > 1 && isNumber$1(gutterWidth) && gutterWidth !== calculatedGutterWidth || matrixDimensions.height > 1 && isNumber$1(gutterHeight) && gutterHeight !== calcualtedGutterHeight) {
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
  if (isNil$1(index) || !isPositiveInteger(index) || !columnExists(index, total)) {
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
  if (isNil$1(index) || !isPositiveInteger(index) || !rowExists(index, total)) {
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

  if (!isNumber$1(gutterWidth) && isNumber$1(gutter)) gutterWidth = gutter;
  if (!isNumber$1(gutterHeight) && isNumber$1(gutter)) gutterHeight = gutter;

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

    var endCell = regionForCellAt(!isNil$1(end) ? end : start, matrixDimensions.height - 1);

    return regionForCells([startCell, endCell]);
  };

  var regionForRows = function regionForRows(start, end) {
    var startCell = regionForCellAt(0, start);

    var endCell = regionForCellAt(matrixDimensions.width - 1, !isNil$1(end) ? end : start);

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

module.exports = createGrid;
