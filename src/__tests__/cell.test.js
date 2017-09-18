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
    it('should allow access to point and size', () => {
      const p = point(10, 20);
      const d = dimensions({ width: 30, height: 40 });
      const instance = cell(p, d);
      expect(instance.point).toBe(p);
      expect(instance.dimensions).toBe(d);
    });
  });
});
