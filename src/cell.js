export const INVALID_PARAMS_ERROR_MESSAGE =
  'You must supply a point object and size object';

const cell = (point, dimensions) => {
  if (!point || !dimensions) {
    throw new Error(INVALID_PARAMS_ERROR_MESSAGE);
  }

  return {
    point,
    dimensions,
  };
};

export default cell;
