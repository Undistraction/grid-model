'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var IS_PERCENTAGE = /^(\d+|\d+[.]\d+)%{1}$/;

var isNumberOrPercentString = function isNumberOrPercentString(value) {
  return isPercentString(value) || isNumber(value);
};

var isPercentString = function isPercentString(value) {
  return IS_PERCENTAGE.exec(value);
};

var isNumber = function isNumber(value) {
  return !isNaN(value);
};

var isPositiveNumber = function isPositiveNumber(value) {
  return isNumber(value) && value >= 0;
};

var INVALID_PARAMS_MESSAGE$1 = 'Parameter was invalid:';

var throwInvalidParamError = function throwInvalidParamError(param, value) {
  throw new Error(INVALID_PARAMS_MESSAGE$1 + ' ' + param + ': ' + value);
};

var dimensions = function dimensions(_ref) {
  var width = _ref.width,
      height = _ref.height,
      aspectRatio = _ref.aspectRatio;

  // Validate supplied params are valid
  if (width && !isNumberOrPercentString(width)) throwInvalidParamError('width', width);

  if (height && !isNumberOrPercentString(height)) throwInvalidParamError('width', width);

  if (aspectRatio && !isPositiveNumber(aspectRatio)) throwInvalidParamError('aspectRatio', aspectRatio);

  // Create array of params that have been supplied
  var validParams = [width, height, aspectRatio].filter(function (x) {
    return x !== undefined && x !== null && x !== '';
  });

  // Validate we have the params we need
  if (validParams.length < 2) {
    throw new Error(INVALID_PARAMS_MESSAGE$1);
  }

  var _width = isNumber(width) ? width : height * aspectRatio;
  var _height = isNumber(height) ? height : width / aspectRatio;
  var _aspectRatio = (!width || !height) && aspectRatio ? aspectRatio : width / height;

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  var area = function area() {
    return width * height;
  };

  return {
    get width() {
      return _width;
    },
    get height() {
      return _height;
    },
    get aspectRatio() {
      return _aspectRatio;
    },
    area: area
  };
};

var INVALID_PARAMS_ERROR_MESSAGE = 'You must supply a point object and size object';

var cell = function cell(point, dimensions) {
  if (!point || !dimensions) {
    throw new Error(INVALID_PARAMS_ERROR_MESSAGE);
  }

  return {
    point: point,
    dimensions: dimensions
  };
};

var INVALID_PARAMS_MESSAGE$2 = 'Params were invalid';

var point = function point(x, y) {
  if (isNaN(x) || isNaN(y)) {
    throw new Error(INVALID_PARAMS_MESSAGE$2);
  }

  var _x = x;
  var _y = y;

  return {
    get x() {
      return _x;
    },
    get y() {
      return _y;
    }
  };
};

var CANT_DERIVE_CELL_DIMENSIONS_MESSAGE = "Grid Couldn't calculate cell dimensions from supplied arguments";

var CANT_DERIVE_GRID_DIMENSIONS_MESSAGE = "Grid Couldn't calculate rows and columns from supplied arguments";

var INVALID_PARAMS_MESSAGE = 'You must supply columns OR cellWidth and rows OR cellHeight';

var INVALID_GRID_DIMENSIONS_MESSAGE = 'Using the values supplied to calculate rows and columns would result in an invalid grid';

var INVALID_GUTTER_DIMENSIONS_MESSAGE = 'The supplied gutter dimensions are incompatible with the other params';

var INVALID_CELL_INDEX_MESSAGE = 'The cell index supplied was invalid';

var INVALID_PARAMS_TO_CELL_AT_MESSAGE = 'You must supply an x and y position to cellAt()';

var grid = function grid() {
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

  var _dimensions = void 0;
  var _gridDimensions = void 0;
  var _cellDimensions = void 0;
  var _gutterDimensions = void 0;

  var pointForCell = function pointForCell(x, y) {
    var xPos = (getCellDimensions().width + getGutterDimensions().width) * x;
    var yPos = (getCellDimensions().height + getGutterDimensions().height) * y;
    return point(xPos, yPos);
  };

  var dimensionsForCell = function dimensionsForCell(x, y) {
    return getCellDimensions();
  };

  /**
   * 
   * @param {*} params Array of params to check
   * 
   * Filter out any params that haven't been set. 
   */
  var validParamCount = function validParamCount(params) {
    return params.filter(function (x) {
      return x !== undefined && x !== null && x !== '';
    }).length;
  };

  var validateGutters = function validateGutters(hGutter, vGutter) {
    return gutterWidth === 0 || gutterWidth === hGutter || gutterHeight === 0 || gutterHeight === vGutter;
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

  var rowsValid = function rowsValid(rows) {
    return rows > 1;
  };
  var columnsValid = function columnsValid(columns) {
    return columns > 1;
  };

  var getDimensions = function getDimensions() {
    if (!_dimensions) _dimensions = saveDimensions();
    return _dimensions;
  };

  var getGridDimensions = function getGridDimensions() {
    if (!_gridDimensions) _gridDimensions = saveGridDimensions();
    return _gridDimensions;
  };

  var getCellDimensions = function getCellDimensions() {
    if (!_cellDimensions) _cellDimensions = saveCellDimensions();
    return _cellDimensions;
  };

  var getGutterDimensions = function getGutterDimensions() {
    if (!_gutterDimensions) _gutterDimensions = saveGutterDimensions();
    return _gutterDimensions;
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

  /**
   * Create a dimensions object to represent the width and height of the grid.
   * If this information hasn't been explicly supplied, try to derive that info
   * from the other parameters supplied. If there is no way to assertain the
   * dimensions, throw an Error.
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

    return dimensions({ width: width, height: height, aspectRatio: aspectRatio });
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

    if (!rowsValid(wholeRows) || !columnsValid(wholeColumns)) {
      throw new Error(INVALID_GRID_DIMENSIONS_MESSAGE);
    }

    return dimensions({ width: wholeColumns, height: wholeRows });
  };

  var saveCellDimensions = function saveCellDimensions() {
    var cW = cellWidth || canDeriveCellWidth() && deriveCellWidth();
    var cH = cellHeight || canDeriveCellHeight() && deriveCellHeight();

    if (!isNumber(cW) || !isNumber(cH)) {
      throw new Error(CANT_DERIVE_CELL_DIMENSIONS_MESSAGE);
    }

    return dimensions({ width: cW, height: cH });
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

    var d = dimensions({
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

  var cellCount = function cellCount() {
    return getGridDimensions().area();
  };

  var cellAt = function cellAt(x, y) {
    if (isNaN(x) || isNaN(y)) {
      throw new Error(INVALID_PARAMS_TO_CELL_AT_MESSAGE);
    }

    if (x < 0 || x >= columns || y < 0 || y >= rows) {
      throw new Error(INVALID_CELL_INDEX_MESSAGE);
    }

    var cellPoint = pointForCell(x, y);
    var cellDimensions = dimensionsForCell(x, y);
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
    cellCount: cellCount,
    cellAt: cellAt
  };
};

exports.grid = grid;
