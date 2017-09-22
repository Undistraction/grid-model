'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var INCORRECT_NUMBER_OF_PARAMS_MESSAGE = 'You must supply exactly two of: width, height, aspectRatio';
var INVALID_PARAMS_MESSAGE$1 = 'Parameter was invalid:';

var throwInvalidParamError = function throwInvalidParamError(param, value) {
  throw new Error(INVALID_PARAMS_MESSAGE$1 + ' ' + param + ': ' + value);
};

var throwIncorrectNumberOfParamsError = function throwIncorrectNumberOfParamsError() {
  throw new Error(INCORRECT_NUMBER_OF_PARAMS_MESSAGE);
};

var validateArgs = function validateArgs(width, height, aspectRatio) {
  if (width && !isNumber$1(width)) throwInvalidParamError('width', width);

  if (height && !isNumber$1(height)) throwInvalidParamError('height', height);

  if (aspectRatio && !isPositiveNumber(aspectRatio)) throwInvalidParamError('aspectRatio', aspectRatio);

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
    throw new Error(INVALID_PARAMS_MESSAGE$2);
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
    throw new Error(INVALID_PARAMS_ERROR_MESSAGE);
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

var region = function region(origin, dimensions) {
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

var CANT_DERIVE_CELL_DIMENSIONS_MESSAGE = "Grid Couldn't calculate cell dimensions from supplied arguments";

var CANT_DERIVE_GRID_DIMENSIONS_MESSAGE = "Grid Couldn't calculate rows and columns from supplied arguments";

var INVALID_PARAMS_MESSAGE = 'You must supply columns OR cellWidth and rows OR cellHeight';

var INVALID_GRID_DIMENSIONS_MESSAGE = 'Using the values supplied to calculate rows and columns would result in an invalid grid';

var INVALID_GUTTER_DIMENSIONS_MESSAGE = 'The supplied gutter dimensions are incompatible with the other params';

var INVALID_CELL_INDEX_MESSAGE = 'The cell index supplied was invalid';

var INVALID_PARAMS_TO_CELL_AT_MESSAGE = 'You must supply an x and y position to cellAt()';

var INVALID_COLUMN_INDEX = 'The column index was invalid';



var createGrid = function createGrid() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      width = _ref.width,
      height = _ref.height,
      aspectRatio = _ref.aspectRatio,
      rows = _ref.rows,
      columns = _ref.columns,
      cellWidth = _ref.cellWidth,
      cellHeight = _ref.cellHeight,
      _ref$gutterWidth = _ref.gutterWidth,
      gutterWidth = _ref$gutterWidth === undefined ? 0 : _ref$gutterWidth,
      _ref$gutterHeight = _ref.gutterHeight,
      gutterHeight = _ref$gutterHeight === undefined ? 0 : _ref$gutterHeight,
      gutter = _ref.gutter;

  var dimensions = void 0;
  var gridDimensions = void 0;
  var cellDimensions = void 0;
  var gutterDimensions = void 0;

  var regionIncluding = function regionIncluding(cells) {
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

    return region(regionTopLeftPoint, regionDimensions);
  };

  var getDimensions = function getDimensions() {
    dimensions = dimensions || saveDimensions();
    return dimensions;
  };

  var getGridDimensions = function getGridDimensions() {
    gridDimensions = gridDimensions || saveGridDimensions();
    return gridDimensions;
  };

  var getCellDimensions = function getCellDimensions() {
    cellDimensions = cellDimensions || saveCellDimensions();
    return cellDimensions;
  };

  var getGutterDimensions = function getGutterDimensions() {
    gutterDimensions = gutterDimensions || saveGutterDimensions();
    return gutterDimensions;
  };

  var canDeriveWidth = function canDeriveWidth() {
    return !!(cellHeight && rows);
  };
  var canDeriveHeight = function canDeriveHeight() {
    return !!(cellWidth && columns);
  };
  var deriveHeight = function deriveHeight() {
    return cellHeight * rows + gutterHeight * (rows - 1);
  };
  var deriveWidth = function deriveWidth() {
    return cellWidth * columns + gutterWidth * (columns - 1);
  };

  var canDeriveCellWidth = function canDeriveCellWidth() {
    return !!(getDimensions().width && columns);
  };
  var canDeriveCellHeight = function canDeriveCellHeight() {
    return !!(getDimensions().height && rows);
  };
  var deriveCellWidth = function deriveCellWidth() {
    return (getDimensions().width - gutterWidth * (columns - 1)) / columns;
  };
  var deriveCellHeight = function deriveCellHeight() {
    return (getDimensions().height - gutterHeight * (rows - 1)) / rows;
  };

  var canDeriveColumns = function canDeriveColumns() {
    return width && cellWidth;
  };
  var canDeriveRows = function canDeriveRows() {
    return height && cellHeight;
  };
  var deriveColumns = function deriveColumns() {
    return getDimensions().width / cellWidth;
  };
  var deriveRows = function deriveRows() {
    return getDimensions().height / cellHeight;
  };

  /**
   * 
   * @param {*} params Array of params to check
   * @returns {array} of params that have been set
   * 
   * Filter out any params that haven't been set. 
   */
  var validParamCount = function validParamCount(params) {
    return params.filter(function (x) {
      return !isNil$1(x) && x !== '';
    }).length;
  };

  var validateGutters = function validateGutters(hGutter, vGutter) {
    return gutterWidth === 0 || gutterWidth === hGutter || gutterHeight === 0 || gutterHeight === vGutter;
  };

  var isValidColumnIndex = function isValidColumnIndex(columnIndex) {
    return columnIndex <= getGridDimensions().width - 1;
  };
  var isValidRowIndex = function isValidRowIndex(rowIndex) {
    return rowIndex <= getGridDimensions().height - 1;
  };

  var topLeftPointForCell = function topLeftPointForCell(x, y) {
    var xPos = (getCellDimensions().width + getGutterDimensions().width) * x;
    var yPos = (getCellDimensions().height + getGutterDimensions().height) * y;
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
  var saveDimensions = function saveDimensions() {
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

    return createDimensions({ width: width, height: height, aspectRatio: aspectRatio });
  };

  var saveGridDimensions = function saveGridDimensions() {
    var c = columns || canDeriveColumns() && deriveColumns();
    var r = rows || canDeriveRows() && deriveRows();
    if (!r || !c) {
      throw new Error(CANT_DERIVE_GRID_DIMENSIONS_MESSAGE);
    }

    var rowParts = r.toString().split('.');
    var columnParts = c.toString().split('.');

    var wholeRows = Number(rowParts[0]);
    var wholeColumns = Number(columnParts[0]);

    if (!wholeRows > 0 || !wholeColumns > 0) {
      throw new Error(INVALID_GRID_DIMENSIONS_MESSAGE);
    }

    return createDimensions({ width: wholeColumns, height: wholeRows });
  };

  var saveCellDimensions = function saveCellDimensions() {
    var cW = cellWidth || canDeriveCellWidth() && deriveCellWidth();
    var cH = cellHeight || canDeriveCellHeight() && deriveCellHeight();

    if (!isNumber$1(cW) || !isNumber$1(cH)) {
      throw new Error(CANT_DERIVE_CELL_DIMENSIONS_MESSAGE);
    }

    return createDimensions({ width: cW, height: cH });
  };

  var saveGutterDimensions = function saveGutterDimensions() {
    var gw = gutterWidth;
    var gh = gutterHeight;

    var remainingHSpace = getDimensions().width - getGridDimensions().width * getCellDimensions().width;
    var remainingVSpace = getDimensions().height - getGridDimensions().height * getCellDimensions().height;

    var hGutter = remainingHSpace / (getGridDimensions().width - 1);
    var vGutter = remainingVSpace / (getGridDimensions().height - 1);
    if (!validateGutters(hGutter, vGutter)) {
      throw new Error(INVALID_GUTTER_DIMENSIONS_MESSAGE);
    } else {
      gw = hGutter;
      gh = vGutter;
    }

    var d = createDimensions({
      width: gw,
      height: gh
    });
    return d;
  };

  // Transfer gutter value to gutterWidth and gutterHeight if they aren't set
  if (!gutterWidth) gutterWidth = gutter || 0;
  if (!gutterHeight) gutterHeight = gutter || 0;

  // Guard against missing params that would cause recursion
  if (!columns && !cellWidth || !rows && !cellHeight) {
    throw new Error(INVALID_PARAMS_MESSAGE);
  }

  // Guard against cellWidth or cellHeight that would break grid;
  if (columns && cellWidth || rows && cellHeight) {
    if (columns * cellWidth > getDimensions().width || rows * cellHeight > getDimensions().height) {
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

  var cellCount = function cellCount() {
    return getGridDimensions().area();
  };

  var regionForCellAt = function regionForCellAt(x, y) {
    if (!isNumber$1(x) || !isNumber$1(y)) {
      throw new Error(INVALID_PARAMS_TO_CELL_AT_MESSAGE);
    }

    if (x < 0 || x >= columns || y < 0 || y >= rows) {
      throw new Error(INVALID_CELL_INDEX_MESSAGE);
    }

    return region(topLeftPointForCell(x, y), getCellDimensions());
  };

  var regionForColumns = function regionForColumns(start, end) {
    // Validate start
    if (isNil$1(start) || !isPositiveInteger(start) || !isValidColumnIndex(start)) {
      throw new Error(INVALID_COLUMN_INDEX);
    }

    // Validate end
    if (!isNil$1(end) && (!isPositiveInteger(end) || !isValidColumnIndex(end))) {
      throw new Error(INVALID_COLUMN_INDEX);
    }

    var startCell = regionForCellAt(start, 0);
    var endCell = regionForCellAt(isNumber$1(end) ? end : start, getGridDimensions().height - 1);

    return regionIncluding([startCell, endCell]);
  };

  var regionForRows = function regionForRows(start, end) {
    // Validate start
    if (isNil$1(start) || !isPositiveInteger(start) || !isValidRowIndex(start)) {
      throw new Error(INVALID_COLUMN_INDEX);
    }

    // Validate end
    if (!isNil$1(end) && (!isPositiveInteger(end) || !isValidRowIndex(end))) {
      throw new Error(INVALID_COLUMN_INDEX);
    }

    var startCell = regionForCellAt(0, start);
    var endCell = regionForCellAt(getGridDimensions().width - 1, isNumber$1(end) ? end : start);

    return regionIncluding([startCell, endCell]);
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
    cellCount: cellCount,
    regionForCellAt: regionForCellAt,
    regionForColumns: regionForColumns,
    regionForRows: regionForRows
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
      x: thisX,
      y: thisY,
      done: false
    };
  };

  return {
    next: next
  };
};

exports.grid = createGrid;
exports.cell = region;
exports.point = createPoint;
exports.dimensions = createDimensions;
exports.iterator = createIterator;
