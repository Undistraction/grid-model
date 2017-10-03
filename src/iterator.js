/** @module Iterator */

export const MISSING_GRID_MESSAGE = '[Grid Iterator] You must supply a grid';
export const MISSING_STRATEGY_MESSAGE =
  '[Grid Iterator] You must supply a strategy';

/**
 * Create an iterator to iterate over the cells of a grid. The iterator will use
 * the `interatorStrategy` of the grid to decide how to iterate, for example
 * should it iterate forward or backwards, vertically or horizontally?
 * 
 *  @param {object} strategy Object represeting the strategy to use for
 * iteration.
 * @param {object} grid Object represeting the grid to iterate over.
 * 
 * @returns {object} An iterator object with a single `next` property.
 */
const createIterator = (strategy, grid) => {
  if (!strategy) {
    throw new Error(MISSING_STRATEGY_MESSAGE);
  }
  if (!grid) {
    throw new Error(MISSING_GRID_MESSAGE);
  }

  return {
    next: strategy(grid.columns, grid.rows),
  };
};

export default createIterator;
