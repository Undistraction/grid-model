import createPoint from './point';

export const INVALID_PARAMS_ERROR_MESSAGE =
  'You must supply a point object and size object';

const cell = (origin, dimensions) => {
  if (!origin || !dimensions) {
    throw new Error(INVALID_PARAMS_ERROR_MESSAGE);
  }

  const top = () => origin.y;
  const right = () => origin.x + dimensions.width;
  const bottom = () => origin.y + dimensions.height;
  const left = () => origin.x;

  return {
    get topLeftPoint() {
      return origin;
    },
    get topRightPoint() {
      return createPoint(right(), top());
    },
    get bottomLeftPoint() {
      return createPoint(left(), bottom());
    },
    get bottomRightPoint() {
      return createPoint(right(), bottom());
    },
    get top() {
      return top();
    },
    get right() {
      return right();
    },
    get bottom() {
      return bottom();
    },
    get left() {
      return left();
    },
    dimensions,
  };
};

export default cell;
