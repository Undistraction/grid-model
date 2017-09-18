import {
  isNumber,
  isNumberOrPercentString,
  isPositiveNumber,
} from './validations';

export const INVALID_DIMENSION_MESSAGE =
  'You must supply at least two arguments of: [width, height, aspectRatio]';
export const INVALID_PARAMS_MESSAGE = 'Parameter was invalid:';

const throwInvalidParamError = (param, value) => {
  throw new Error(`${INVALID_PARAMS_MESSAGE} ${param}: ${value}`);
};

const dimensions = ({ width, height, aspectRatio }) => {
  // Validate supplied params are valid
  if (width && !isNumberOrPercentString(width))
    throwInvalidParamError('width', width);

  if (height && !isNumberOrPercentString(height))
    throwInvalidParamError('width', width);

  if (aspectRatio && !isPositiveNumber(aspectRatio))
    throwInvalidParamError('aspectRatio', aspectRatio);

  // Create array of params that have been supplied
  const validParams = [width, height, aspectRatio].filter(function(x) {
    return x !== undefined && x !== null && x !== '';
  });

  // Validate we have the params we need
  if (validParams.length < 2) {
    throw new Error(INVALID_PARAMS_MESSAGE);
  }

  const _width = isNumber(width) ? width : height * aspectRatio;
  const _height = isNumber(height) ? height : width / aspectRatio;
  const _aspectRatio =
    (!width || !height) && aspectRatio ? aspectRatio : width / height;

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const area = () => width * height;

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
    area,
  };
};

export default dimensions;
