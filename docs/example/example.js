import { createGrid } from '../../lib/index';

// Setup

const divider =
  '––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––';

const header = title => {
  console.log('');
  console.log(divider);
  console.log(title);
  return divider;
};

// Start

const grid = createGrid({
  width: 300,
  height: 400,
  columns: 6,
  rows: 8,
  gutter: 6,
});

console.log(header('Grid'));
console.log('Grid');
console.log(` width:              ${grid.width}`);
console.log(` height:             ${grid.height}`);
console.log(` aspect ratio:       ${grid.aspectRatio}`);
console.log(` columns:            ${grid.columns}`);
console.log(` rows:               ${grid.rows}`);
console.log(` cell width:         ${grid.cellWidth}`);
console.log(` cell height:        ${grid.cellHeight}`);
console.log(` gutter width:       ${grid.gutterWidth}`);
console.log(` gutter height:      ${grid.gutterHeight}`);

console.log(header('Area'));
console.log('Grid');
console.log(` dimension area:     ${grid.dimensions.area()}`);
console.log(` matrix area:        ${grid.matrixDimensions.area()}`);

console.log(header('regionForCellAt()'));
const cellRegion = grid.regionForCellAt(4, 5);
console.log('Region');
console.log(` top:              ${cellRegion.top}`);
console.log(` right:            ${cellRegion.right}`);
console.log(` bottom:           ${cellRegion.bottom}`);
console.log(` left:             ${cellRegion.left}`);
const cellRegionTopLeftPoint = cellRegion.topLeftPoint;
const cellRegionTopRightPoint = cellRegion.topRightPoint;
const cellRigionBottomRightPoint = cellRegion.bottomRightPoint;
const cellRegionBottomLeftPoint = cellRegion.bottomLeftPoint;
console.log(
  ` top left point    ${cellRegionTopLeftPoint.x}/${cellRegionTopLeftPoint.y}`
);
console.log(
  ` top right point    ${cellRegionTopRightPoint.x}/${cellRegionTopRightPoint.y}`
);
console.log(
  ` bottom right point    ${cellRigionBottomRightPoint.x}/${cellRigionBottomRightPoint.y}`
);
console.log(
  ` bottom left point    ${cellRegionBottomLeftPoint.x}/${cellRegionBottomLeftPoint.y}`
);

console.log(header('regionForCellsAt()'));
