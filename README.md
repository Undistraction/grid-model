# README

This project is a simple library to model a grid and access information about the cells within it. 

## Build 

The project is built using rollup using the config file `rollup.config.js`. It is transpiled using babel.

```
yarn run build
```

## Test

Test the project using jest
```
yarn run test
```

## Release

Bump the version (patch, minor, major, prepatch, preminor, premajor, prerelease)
```
npm version patch -m "Bump version to  %s"
```

Publish to NPM:
```
npm publish
```

## Params

The grid supports as many combinations of parameters as possible, calculating the missing params from those that were supplies. In the event conflicting params are supplied it will drop the most sensible param and use the others.
In the event it doesn't have enough params to calculate the missing params, it will throw an error. It doesn't support situations where the width of the columns or the height of the rows is greater than the width or height of the grid and will throw an error in this situation.

## Usage

This library contains a few objects you need to understand.

- `grid` represents a series of cells aranged in rows and columns.
- `point` represents a point in 2D space within the grid.
- `dimensions` represents an area in 2D space within the grid.
- `region` represents location and dimensions of a part of the grid encompassing one or more cells.

Create a grid:

```
const grid = createGrid({
  width: 800,
  height: 1200,
  columns: 10,
  rows: 12,
  gutter: 10
})
```

Retrieve basic information about the grid:

```
grid.dimensions.width // 800
grid.dimensions.height // 1200
grid.gridDimensions.width // 10
grid.gridDimensions.height // 12
grid.gutterDimensions.width // 10
grid.gutterDimensions.height // 10
```

So far so meh, but now we can get information about the cells defined by the grid.

Retrieve the total number of cells:

```
grid.cellCount // 120
```

Retrieve information about a particular cell:

```
const cellRegion = grid.regionForCellAt(6, 3)
cellRegion.dimensions.width //
cellRegion.dimensions.height //
cellRegion.topLeftPoint.x //
cellRegion.bottomRightPoint.y
cellRegion.top //
cellRegion.right //
```

Retrieve information about a single row or column:

```
grid.regionForRows(3).dimensions.width
grid.regionForColumn(6).bottomLeftPoint.x
```

Or multiple rows or columns:

```
grid.regionForRows(3, 8).dimensions.width
grid.regionForColumn(6,10).topRightPoint.x
```




