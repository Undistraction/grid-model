import { isNumber } from 'lodash';

import { isNumberOrPercentString, isPositiveNumber } from './validations';

export const MISSING_PARAMS_MESSAGE =
  'You must supply at least two arguments of: [width, height, aspectRatio]';
export const INVALID_PARAMS_MESSAGE = 'Parameter was invalid:';

const throwInvalidParamError = (param, value) => {
  throw new Error(`${INVALID_PARAMS_MESSAGE} ${param}: ${value}`);
};

const throwMissingParamsError = () => {
  throw new Error(MISSING_PARAMS_MESSAGE);
};

const createDimensions = ({ width, height, aspectRatio }) => {
  // Validate we have the params we need
  if ([width, height, aspectRatio].filter(x => isNumber(x)).length < 2) {
    throwMissingParamsError();
  }

  // Validate supplied params are valid
  if (width && !isNumberOrPercentString(width))
    throwInvalidParamError('width', width);

  if (height && !isNumberOrPercentString(height))
    throwInvalidParamError('height', height);

  if (aspectRatio && !isPositiveNumber(aspectRatio))
    throwInvalidParamError('aspectRatio', aspectRatio);

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
