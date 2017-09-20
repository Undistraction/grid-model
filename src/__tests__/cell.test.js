import createCell, { INVALID_PARAMS_ERROR_MESSAGE } from '../cell';
import createPoint from '../point';
import createDimensions from '../dimensions';

describe('cell', () => {
  describe('when initialised with missing arguments', () => {
    it('should throw an error', () => {
      expect(() => createCell()).toThrowError(INVALID_PARAMS_ERROR_MESSAGE);
      expect(() => createCell(createPoint(10, 20))).toThrowError(
        INVALID_PARAMS_ERROR_MESSAGE
      );
    });
  });

  describe('when initialised with valid arguments', () => {
    it('should allow access to position, extents and size', () => {
      const topLeftPoint = createPoint(10, 20);
      const d = createDimensions({ width: 30, height: 40 });
      const topRightPoint = createPoint(40, 20);
      const bottomLeftPoint = createPoint(10, 60);
      const bottomRightPoint = createPoint(40, 60);
      const instance = createCell(topLeftPoint, d);
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
