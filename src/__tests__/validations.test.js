import { isNumber, isPercentString, isPositiveNumber } from '../validations';

describe('validations', () => {
  describe('isNumber', () => {
    it('should identify a number', () => {
      const validValues = [
        22,
        0,
        0.3,
        -66,
        -66.6,
        '55',
        '55.7',
        '-55',
        '-55.7',
      ];

      for (const value of validValues) {
        expect(isNumber(value)).toBeTruthy();
      }
    });
    it('should identify a non-number', () => {
      const invalidValues = ['sss', '33.h', undefined, NaN];
      for (const value of invalidValues) {
        expect(isNumber(value)).toBeFalsy();
      }
    });
  });

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
});