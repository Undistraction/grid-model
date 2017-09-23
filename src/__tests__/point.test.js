import createPoint, { INVALID_PARAMS_MESSAGE } from '../point';

describe('point', () => {
  describe('with missing params', () => {
    it('should throw an error', () => {
      expect(() => createPoint()).toThrowError(INVALID_PARAMS_MESSAGE);
      expect(() => createPoint(4)).toThrowError(INVALID_PARAMS_MESSAGE);
      expect(() => createPoint(4, '5')).toThrowError(INVALID_PARAMS_MESSAGE);
      expect(() => createPoint('5', 4)).toThrowError(INVALID_PARAMS_MESSAGE);
    });
  });

  describe('with invalid params', () => {
    it('should throw an error', () => {
      expect(() => createPoint(5, 's')).toThrowError(INVALID_PARAMS_MESSAGE);
      expect(() => createPoint('s', 4)).toThrowError(INVALID_PARAMS_MESSAGE);
    });
  });

  it('should store x and y position', () => {
    const instance = createPoint(100, 200);
    expect(instance.x).toBe(100);
    expect(instance.y).toBe(200);
  });
});
