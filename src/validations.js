import { isNumber } from 'lodash';

const IS_PERCENTAGE = /^(\d+|\d+[.]\d+)%{1}$/;

export const isPercentString = value => IS_PERCENTAGE.exec(value);

export const isNumberOrPercentString = value =>
  isPercentString(value) || isNumber(value);

export const isPositiveNumber = value => isNumber(value) && value >= 0;
