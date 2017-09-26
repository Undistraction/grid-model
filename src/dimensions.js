import { isNumber } from 'lodash';
import { isPositiveNumber } from './validations';
import { throwError } from './errors';

export const INCORRECT_NUMBER_OF_PARAMS_MESSAGE =
  'You must supply exactly two of: width, height, aspectRatio';
export const INVALID_PARAMS_MESSAGE = 'Parameter was invalid:';

const throwInvalidParamError = (param, value) => {
  throwError(`${INVALID_PARAMS_MESSAGE} ${param}: ${value}`);
};

const throwIncorrectNumberOfParamsError = () => {
  throwError(INCORRECT_NUMBER_OF_PARAMS_MESSAGE);
};

const validateArgs = (width, height, aspectRatio) => {
  if (width && !isNumber(width)) throwInvalidParamError('width', width);

  if (height && !isNumber(height)) throwInvalidParamError('height', height);

  if (isNumber(aspectRatio) && !isPositiveNumber(aspectRatio))
    throwInvalidParamError('aspectRatio', aspectRatio);

  // Validate we have the params we need
  if ([width, height, aspectRatio].filter(x => isNumber(x)).length !== 2) {
    throwIncorrectNumberOfParamsError();
  }

  return {
    validatedWidth: isNumber(width) ? width : height * aspectRatio,
    validatedHeight: isNumber(height) ? height : width / aspectRatio,
    validatedAspectRatio: isNumber(aspectRatio) ? aspectRatio : width / height,
  };
};

const createDimensions = ({ width, height, aspectRatio }) => {
  // Validate supplied params are valid
  const {
    validatedWidth,
    validatedHeight,
    validatedAspectRatio,
  } = validateArgs(width, height, aspectRatio);

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const area = () => width * height;

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
    area,
  };
};

export default createDimensions;
