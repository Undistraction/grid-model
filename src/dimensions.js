import { isNumber } from 'lodash';
import { isPositiveNumber } from './validations';
import { throwError } from './errors';

export const INCORRECT_NUMBER_OF_PARAMS_MESSAGE =
  'You must supply exactly two of: width, height, aspectRatio';
export const INVALID_PARAMS_MESSAGE = 'Parameter was invalid:';

/**
 * Throw an error due to params being invalid.
 * 
 * @param {string} param The name of the invalid param.
 * @param {value} value The value of the invalid param.
 * 
 * @returns {undefined}
 */
const throwInvalidParamError = (param, value) => {
  throwError(`${INVALID_PARAMS_MESSAGE} ${param}: ${value}`);
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
 */
const validateArgs = (width, height, aspectRatio) => {
  if (width && !isNumber(width)) throwInvalidParamError('width', width);

  if (height && !isNumber(height)) throwInvalidParamError('height', height);

  if (isNumber(aspectRatio) && !isPositiveNumber(aspectRatio))
    throwInvalidParamError('aspectRatio', aspectRatio);

  // Validate we have the params we need
  if ([width, height, aspectRatio].filter(x => isNumber(x)).length !== 2) {
    throwError(INCORRECT_NUMBER_OF_PARAMS_MESSAGE);
  }

  return {
    validatedWidth: isNumber(width) ? width : height * aspectRatio,
    validatedHeight: isNumber(height) ? height : width / aspectRatio,
    validatedAspectRatio: isNumber(aspectRatio) ? aspectRatio : width / height,
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
 */
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

  /**
   * Return the area of the dimensions.
   * 
   * @returns {number} The width * the height.
   */
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
