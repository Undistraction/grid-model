import createPoint from './point';

export const INVALID_PARAMS_ERROR_MESSAGE =
  'You must supply a point object and size object';

const validateArgs = (origin, dimensions) => {
  if (!origin || !dimensions) {
    throw new Error(INVALID_PARAMS_ERROR_MESSAGE);
  }
  return { validatedOrigin: origin, validatedDimensions: dimensions };
};

const calculatePoints = (top, right, bottom, left) => ({
  topLeftPoint: createPoint(left, top),
  topRightPoint: createPoint(right, top),
  bottomRightPoint: createPoint(right, bottom),
  bottomLeftPoint: createPoint(left, bottom),
});

const calculateBounds = (origin, dimensions) => ({
  top: origin.y,
  right: origin.x + dimensions.width,
  bottom: origin.y + dimensions.height,
  left: origin.x,
});

const region = (origin, dimensions) => {
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

export default region;
