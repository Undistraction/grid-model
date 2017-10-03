import { add, subtract, curry, curryRight } from 'lodash';

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
