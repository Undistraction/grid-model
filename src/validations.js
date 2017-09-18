const IS_PERCENTAGE = /^(\d+|\d+[.]\d+)%{1}$/;

export const isNumberOrPercentString = value =>
  isPercentString(value) || isNumber(value);

export const isPercentString = value => IS_PERCENTAGE.exec(value);

export const isNumber = value => !isNaN(value);

export const isPositiveNumber = value => isNumber(value) && value >= 0;
