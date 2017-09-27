/** @module Point */

import { isNumber } from 'lodash';
import { throwError } from './errors';

export const INVALID_PARAMS_MESSAGE = 'Params were invalid';

/**
 * Validate the supplied arguments.
 * 
 * @param {number} x The x coordinate.
 * @param {number} y  The y coordinate.
 * @returns {object} An object containing the validated values.
 */
const validateArgs = (x, y) => {
  if (!isNumber(x) || !isNumber(y)) {
    throwError(INVALID_PARAMS_MESSAGE);
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
const createPoint = (x, y) => {
  validateArgs(x, y);

  return {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
  };
};

export default createPoint;
