import {
  isPercentString,
  isPositiveNumber,
  isPositiveInteger,
} from '../validations';

describe('validations', () => {
  describe('isPositiveNumber', () => {
    it('should identify a positive number', () => {
      const validValues = [22, 0, 0.3, -0];

      for (const value of validValues) {
        expect(isPositiveNumber(value)).toBeTruthy();
      }
    });
    it('should identify a non-number or negative number', () => {
      const invalidValues = [-0.1, -1000];
      for (const value of invalidValues) {
        expect(isPositiveNumber(value)).toBeFalsy();
      }
    });
  });

  describe('isPercentString', () => {
    it('should identify a percentage string', () => {
      const validValues = ['3%', '33.9%', '0%'];
      for (const value of validValues) {
        expect(isPercentString(value)).toBeTruthy();
      }
    });
    it('should identify a non-percentage string', () => {
      const invalidValues = [44, '44', '44', '-44%', '%44', '44%%', '44 %'];
      for (const value of invalidValues) {
        expect(isPercentString(value)).toBeFalsy();
      }
    });
  });

  describe('isPositiveInteger', () => {
    it('should identify a positive integer', () => {
      const validValues = [6, 66, 1, 0, -0];

      for (const value of validValues) {
        expect(isPositiveInteger(value)).toBeTruthy();
      }
    });
    it('should identify a non-integer or negative number', () => {
      const invalidValues = [-0.1, -1000, -1, -66];
      for (const value of invalidValues) {
        expect(isPositiveInteger(value)).toBeFalsy();
      }
    });
  });
});
