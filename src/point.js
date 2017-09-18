import { isNumber } from 'lodash';

export const INVALID_PARAMS_MESSAGE = 'Params were invalid';

const point = (x, y) => {
  if (!isNumber(x) || !isNumber(y)) {
    throw new Error(INVALID_PARAMS_MESSAGE);
  }

  const _x = x;
  const _y = y;

  return {
    get x() {
      return _x;
    },
    get y() {
      return _y;
    },
  };
};

export default point;
