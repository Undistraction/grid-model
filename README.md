![Grid Model Logo](https://dl.dropbox.com/s/g0pv4jk9a4q2s50/grid-model-logo.png?dl=0)

# Grid Model

Grid Model is a simple library to model a grid and access information about the cells within it. 

## Quickstart

### Docs

View the docs in your default browser using:
```
yarn run docs
```

### Build 

The project is built using rollup using the config file `rollup.config.js`. It is transpiled using babel.

```
yarn run build
```

### Test

Test the project using jest
```
yarn run test
```

### Release

Bump the version (patch, minor, major, prepatch, preminor, premajor, prerelease)
```
npm version patch -m "Bump version to  %s"
```

Publish to NPM:
```
npm publish
```

## Elements Of A Grid

![Diagram of grid](https://dl.dropbox.com/s/yem64726zrct3l4/diagram.jpg?dl=0)


## Usage

This library contains a few objects you need to understand.

- `grid` represents a series of cells aranged in rows and columns.
- `point` represents a point in 2D space within the grid.
- `dimensions` represents an area in 2D space within the grid.
- `region` represents location and dimensions of a part of the grid encompassing one or more cells.

In the event that you supply parameters that can't be reconciled into a valid grid, it will error. It will not be able to reconcile the params if:

- You don't give it enough information about the grid
- You give it conflicting params that can't be reconciled.

For example, if you just supply a `width` and `height`, there is no way it can know how many rows and columns you want, but if you supply a `cellWidth` and a `cellHeight` alongside, it can calculate the number of rows, columns and gutters for a valid grid. An example of conflicting params would be if you supplied `width`, `columns` and `cellWidth` which didn't correlate, for example if the `width` was 100, `columns` was 10 and `cellWidth` was 20. In this instance you could drop the `width` and let it be calculated from the `columns` and `cellWidth`, drop the `columns` and let it be calculated from the `width` and `cellWidth` or drop the `cellWidth` and let it be calculated from the `width` and `columns`.

Note: The numeric values for `width` `height`, `cellWidth`, `cellHeight`, `gutterWidth` and `gutterHeight` are unitless. The do not represent any specific unit of measurement like cm or px. It is up to you to either use values that reflect whatever units you are using in your layout, or convert the values of the grid as needed.

### Example

The following example can be run using:

```
yarn run example
```

If you want to play with other values, the src can be found in `example/example.js`.

For this example we'll use a 6 * 8 grid with a 3:4 aspect ratio with even gutters and (almost) square cells:

Create a grid:

```
const grid = createGrid({
  width: 400,
  height: 300,
  columns: 6,
  rows: 8,
  gutter: 6
})
```

Retrieve basic information about the grid. Note: for most properties you can either use the property name directly or access through a `dimensions` object.

#### Dimensions

The grid's dimensions are its total height and total width.

```
grid.width // 400
grid.height // 300
grid.aspectRatio // 0.75
grid.dimensions.width // 400
grid.dimensions.height // 300
grid.dimensions.aspectRatio // 0.75
```

#### Matrix Dimensions

The grid's matrix dimensions are the number of columns and cells it has.

```
grid.columns // 6
grid.rows // 8
grid.matrix.width // 6
grid.matrix.height // 8
```

#### Cell Dimensions

The grid's cell dimensions are the with and height of the cells within it. All cells in a grid have the same width and height.

```
grid.cellWidth // 45
grid.cellHeight // 44.75
grid.cellDimensions.width // 45
grid.cellDimensions.height // 44.75
```

#### Gutter Dimensions

The grid's gutter dimensions are the with and height of the gutters throughout the grid. Gutters are the spaces between the cells. The width of the gutters represents the space between columns and the height of the gutters represents the space between rows.

```
grid.gutterWidth // 3
grid.gutterHeight // 3
grid.cellDimensions.width // 3
grid.cellDimensions.height // 3
```

### Each of the `dimensions` objects also exposes an area property:

```
grid.dimensions.area // 120000
grid.matrix.area // 48
```

### Retrieve the total number of cells in a grid.

```
grid.cellCount // 48
```

### Individual Cells

You can retrieve information about a single cell in the grid using its column and row index. A call to `regionForCellAt` will return a region object from which you can discover information about the cell.

```
const region = grid.regionForCellAt(4,5);
const cellRegion = grid.regionForCellAt(4, 5);
cellRegion.top // 253.75
cellRegion.right // 249
cellRegion.bottom // 298.5
cellRegion.left // 204
cellRegion.topLeftPoint.x // 204
cellRegion.topLeftPoint.y // 253.75
```

You can also use to the locations of two cells to define a region. The leftmost cell will define the left edge of the region, the rightmost cell the right edge, the topmost cell the top edge and the bottomost cell the bottom edge.

```
grid.regionForCellsAt(4,5, 5, 7)
```

