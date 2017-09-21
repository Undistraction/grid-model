import { isNumber } from 'lodash';

export const INVALID_PARAMS_MESSAGE = 'Params were invalid';

const validateArgs = (x, y) => {
  if (!isNumber(x) || !isNumber(y)) {
    throw new Error(INVALID_PARAMS_MESSAGE);
  }
  return { validatedX: x, validatedY: y };
};

const createPoint = (x, y) => {
  const { validatedX, validatedY } = validateArgs(x, y);

  return {
    get x() {
      return validatedX;
    },
    get y() {
      return validatedY;
    },
  };
};

export default createPoint;
