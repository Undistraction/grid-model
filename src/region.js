/** @module Region */

import createPoint from './point';
import { throwError } from './errors';

export const INVALID_PARAMS_ERROR_MESSAGE =
  'You must supply a point object and size object';

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
const validateArgs = (origin, dimensions) => {
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
const calculatePoints = (top, right, bottom, left) => ({
  topLeftPoint: createPoint(left, top),
  topRightPoint: createPoint(right, top),
  bottomRightPoint: createPoint(right, bottom),
  bottomLeftPoint: createPoint(left, bottom),
});

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
const calculateBounds = (origin, dimensions) => ({
  top: origin.y,
  right: origin.x + dimensions.width,
  bottom: origin.y + dimensions.height,
  left: origin.x,
});

/**
 * Create a region object, representing a position an dimensions with a
 * cartesian coordinate sytem.
 * 
 * @param {object} origin A point object.
 * @param {object} dimensions A dimensions object.
 * 
 * @returns {object} A region object.
 */
const createRegion = (origin, dimensions) => {
  validateArgs(origin, dimensions);

  const { top, right, bottom, left } = calculateBounds(origin, dimensions);

  const {
    topLeftPoint,
    topRightPoint,
    bottomRightPoint,
    bottomLeftPoint,
  } = calculatePoints(top, right, bottom, left);

  return {
    top,
    right,
    bottom,
    left,
    topLeftPoint,
    topRightPoint,
    bottomRightPoint,
    bottomLeftPoint,
    dimensions,
  };
};

export default createRegion;
