/* eslint-disable import/prefer-default-export' */
const ERROR_PREFIX = '[Grid Model]';

export const throwError = message => {
  throw new Error(`${ERROR_PREFIX} ${message}`);
};
