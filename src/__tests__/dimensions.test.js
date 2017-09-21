import createDimensions, {
  INVALID_PARAMS_MESSAGE,
  INVALID_DIMENSIONS_MESSAGE,
} from '../dimensions';

describe('dimensions', () => {
  describe('invalid params', () => {
    it('throws and error if only width, only height, or only aspectRatio are supplied', () => {
      expect(() => createDimensions({ width: 100 })).toThrowError(
        new RegExp(INVALID_DIMENSIONS_MESSAGE)
      );
      expect(() => createDimensions({ height: 100 })).toThrowError(
        new RegExp(INVALID_DIMENSIONS_MESSAGE)
      );
      expect(() => createDimensions({ aspectRatio: 0.5 })).toThrowError(
        new RegExp(INVALID_DIMENSIONS_MESSAGE)
      );
    });
  });

  it("doesn't throw an error with valid params", () => {
    expect(() =>
      createDimensions({ width: 111, height: 222 })
    ).not.toThrowError();
  });

  it("throws error if width or height aren't valid numbers or percentages", () => {
    expect(() =>
      createDimensions({ width: '111%', height: '44%' })
    ).not.toThrowError();

    expect(() => createDimensions({ width: 'aaa', height: 10 })).toThrowError(
      new RegExp(INVALID_PARAMS_MESSAGE)
    );

    expect(() => createDimensions({ width: null, height: 10 })).toThrowError(
      new RegExp(INVALID_PARAMS_MESSAGE)
    );
  });

  it("throws an error if aspectRatio isn't a valid number", () => {
    expect(() =>
      createDimensions({ width: 50, aspectRatio: -33 })
    ).toThrowError(new RegExp(INVALID_PARAMS_MESSAGE));
  });

  it.only('stores width and height', () => {
    const instance = createDimensions({ width: 100, height: 200 });
    expect(instance.width).toBe(100);
    expect(instance.height).toBe(200);
  });

  it('stores width and height if zero', () => {
    const instance = createDimensions({ width: 0, height: 0 });
    expect(instance.width).toBe(0);
    expect(instance.height).toBe(0);
  });

  it('ignores supplied aspectRatio if width and height are supplied', () => {
    const instance = createDimensions({
      width: 100,
      height: 200,
      aspectRatio: 2,
    });
    expect(instance.width).toBe(100);
    expect(instance.height).toBe(200);
    expect(instance.aspectRatio).toBe(0.5);
  });

  it('calculates width if only height and aspectRatio are supplied', () => {
    const instance = createDimensions({ height: 200, aspectRatio: 0.5 });
    expect(instance.width).toBe(100);
    expect(instance.aspectRatio).toBe(0.5);
  });

  it('calculates height if only width and aspectRatio are supplied', () => {
    const instance = createDimensions({ width: 100, aspectRatio: 0.5 });
    expect(instance.width).toBe(100);
    expect(instance.aspectRatio).toBe(0.5);
  });

  it('supplies correct aspect ratio when supplied with width and height', () => {
    const instance = createDimensions({ width: 100, height: 200 });
    expect(instance.aspectRatio).toEqual(0.5); // 100 / 200
  });

  describe('api', () => {
    describe('area() returns the width x height', () => {
      expect(createDimensions({ width: 100, height: 200 }).area()).toBe(20000);
    });
  });
});
