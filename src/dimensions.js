import { isNumber } from 'lodash';
import { isPositiveNumber } from './validations';

export const INCORRECT_NUMBER_OF_PARAMS_MESSAGE =
  'You must supply exactly two of: width, height, aspectRatio';
export const INVALID_PARAMS_MESSAGE = 'Parameter was invalid:';

const throwInvalidParamError = (param, value) => {
  throw new Error(`${INVALID_PARAMS_MESSAGE} ${param}: ${value}`);
};

const throwIncorrectNumberOfParamsError = () => {
  throw new Error(INCORRECT_NUMBER_OF_PARAMS_MESSAGE);
};

const createDimensions = ({ width, height, aspectRatio }) => {
  // Validate supplied params are valid
  if (width && !isNumber(width)) {
    throwInvalidParamError('width', width);
  }

  if (height && !isNumber(height)) throwInvalidParamError('height', height);

  if (aspectRatio && !isPositiveNumber(aspectRatio))
    throwInvalidParamError('aspectRatio', aspectRatio);

  // Validate we have the params we need
  if ([width, height, aspectRatio].filter(x => isNumber(x)).length !== 2) {
    throwIncorrectNumberOfParamsError();
  }

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const area = () => width * height;

  return {
    get width() {
      if (!isNumber(width)) width = height * aspectRatio;
      return width;
    },
    get height() {
      if (!isNumber(height)) height = width / aspectRatio;
      return height;
    },
    get aspectRatio() {
      if (!isNumber(aspectRatio)) aspectRatio = width / height;
      return aspectRatio;
    },
    area,
  };
};

export default createDimensions;
