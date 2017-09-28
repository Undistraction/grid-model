/** @module Errors */

/* eslint-disable import/prefer-default-export' */
const ERROR_PREFIX = '[Grid Model]';

/**
 * Throw an error, adding a prefix so it is clear which library the error
 * originated from.
 * 
 * @param {string} message The error message.
 * 
 * @returns {undefined}
 * @private
 */
export const throwError = message => {
  throw new Error(`${ERROR_PREFIX} ${message}`);
};
