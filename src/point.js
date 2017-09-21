import { isNumber } from 'lodash';

export const INVALID_PARAMS_MESSAGE = 'Params were invalid';

const createPoint = (x, y) => {
  if (!isNumber(x) || !isNumber(y)) {
    throw new Error(INVALID_PARAMS_MESSAGE);
  }

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
