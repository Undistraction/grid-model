import { isNumber, isInteger } from 'lodash';

const IS_PERCENTAGE = /^(\d+|\d+[.]\d+)%{1}$/;

export const isPercentString = value => IS_PERCENTAGE.exec(value);

export const isPositiveNumber = value => isNumber(value) && value >= 0;

export const isPositiveInteger = value => isInteger(value) && value >= 0;
