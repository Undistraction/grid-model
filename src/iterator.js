export const MISSING_GRID_MESSAGE = 'You must supply a grid';

const iterator = grid => {
  if (!grid) {
    throw new Error(MISSING_GRID_MESSAGE);
  }

  let x = 0;
  let y = 0;
  const { columns } = grid;
  const { rows } = grid;

  const next = () => {
    const thisX = x;
    const thisY = y;

    if (x === 0 && y === rows) return { done: true };

    if (x + 1 === columns) {
      x = 0;
      y += 1;
    } else {
      x += 1;
    }
    return {
      x: thisX,
      y: thisY,
      done: false,
    };
  };

  return {
    next,
  };
};

export default iterator;
