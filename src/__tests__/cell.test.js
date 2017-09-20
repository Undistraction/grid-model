import cell, { INVALID_PARAMS_ERROR_MESSAGE } from '../cell';
import point from '../point';
import dimensions from '../dimensions';

describe('cell', () => {
  describe('when initialised with missing arguments', () => {
    it('should throw an error', () => {
      expect(() => cell()).toThrowError(INVALID_PARAMS_ERROR_MESSAGE);
      expect(() => cell(point(10, 20))).toThrowError(
        INVALID_PARAMS_ERROR_MESSAGE
      );
    });
  });

  describe('when initialised with valid arguments', () => {
    it('should allow access to position, extents and size', () => {
      const topLeftPoint = point(10, 20);
      const d = dimensions({ width: 30, height: 40 });
      const topRightPoint = point(40, 20);
      const bottomLeftPoint = point(10, 60);
      const bottomRightPoint = point(40, 60);
      const instance = cell(topLeftPoint, d);
      expect(instance.topLeftPoint).toEqual(topLeftPoint);
      expect(instance.topRightPoint).toEqual(topRightPoint);
      expect(instance.bottomLeftPoint).toEqual(bottomLeftPoint);
      expect(instance.bottomRightPoint).toEqual(bottomRightPoint);
      expect(instance.left).toEqual(topLeftPoint.x);
      expect(instance.right).toEqual(topRightPoint.x);
      expect(instance.top).toEqual(topLeftPoint.y);
      expect(instance.bottom).toEqual(bottomLeftPoint.y);
      expect(instance.dimensions).toEqual(d);
    });
  });
});
