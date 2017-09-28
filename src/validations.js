/** @module Validations */

import { isNumber, isInteger } from 'lodash';

/**
 * RegEx for a number followed by the percent symbol.
 * 
 * @private
 */
const IS_PERCENTAGE = /^(\d+|\d+[.]\d+)%{1}$/;

const greaterThanZero = value => value >= 0;

/**
 * Is the value a number followed by a percent sign, for example '44%'.
 * 
 * @param {string} value The value to check.
 * 
 * @returns {boolan} Was the value valid?
 * @private
 */
export const isPercentString = value => IS_PERCENTAGE.exec(value);

/**
 * Is the value a number greater than zero.
 * 
 * @param {string} value The value to check.
 * 
 * @returns {boolan} Was the value valid?
 * @private
 */
export const isPositiveNumber = value =>
  isNumber(value) && greaterThanZero(value);

/**
 * Is the value an integer greater than zero.
 * 
 * @param {string} value The value to check.
 * 
 * @returns {boolan} Was the value valid?
 * @private
 */
export const isPositiveInteger = value =>
  isInteger(value) && greaterThanZero(value);
