import point, { INVALID_PARAMS_MESSAGE } from '../point';

describe('point', () => {
  describe('with missing params', () => {
    it('should throw an error', () => {
      expect(() => point()).toThrowError(INVALID_PARAMS_MESSAGE);
      expect(() => point(4)).toThrowError(INVALID_PARAMS_MESSAGE);
    });
  });

  describe('with invalid params', () => {
    it('should throw an error', () => {
      expect(() => point(5, 's')).toThrowError(INVALID_PARAMS_MESSAGE);
      expect(() => point('s', 4)).toThrowError(INVALID_PARAMS_MESSAGE);
    });
  });

  it('should store x and y position', () => {
    const instance = point(100, 200);
    expect(instance.x).toBe(100);
    expect(instance.y).toBe(200);
  });
});
