import { add, subtract, curry, curryRight, gt, lt } from 'lodash';

/**
 * Increment the supplied value by one.
 * 
 * @param {number} index The value to be incremented.
 * 
 * @return {number} The incremented value.
 * @private
 */
export const increment = curry(add)(1);

/**
 * Decrement the supplied value by one.
 * 
 * @param {number} value The value to be decremented.
 * 
 * @return {number} The decremented value.
 * @private
 */
export const decrement = curryRight(subtract)(1);

/**
 * Return the largest of the two supplied values.
 * 
 * @param {number} x The first value to compare.
 * @param {number} y The second value to compare.
 * 
 * @returns {number} The greatest value.
 */
export const keepGreatest = (x, y) => (gt(y, x) ? y : x);

/**
 * Return the smallest of the two supplied values.
 * 
 * @param {number} x The first value to compare.
 * @param {number} y The second value to compare.
 * 
 * 
 * @returns {number} The greatest value.
 */
export const keepSmallest = (x, y) => (lt(y, x) ? y : x);
