# README

This project is a simple library to model a grid and access information about the cells within it. 

## Build 

The project is built using rollup using the config file `rollup.config.js`. It is transpiled using babel.

```
yarn run build
```

## Params

The grid supports as many combinations of parameters as possible, calculating the missing params from those that were supplies. In the event conflicting params are supplied it will drop the most sensible param and use the others.
In the event it doesn't have enough params to calculate the missing params, it will throw an error. It doesn't support situations where the width of the columns or the height of the rows is greater than the width or height of the grid and will throw an error in this situation.

- width + height = calculate aspectRatio
- width + aspectRatio = calculate height
- height + aspectRatio = calculate width
- width + height + aspectRatio = ignore aspectRatio and calculate from width + height
- width = error
- height = error
- aspectRatio = error
- dimensions + columns + rows = calculate cellWidth, cellHeight, gutterWidth, gutterHeight
- dimensions + columns + cellHeight = calculate rows, cellWidth, gutterWidth, gutterHeight
- dimensions + rows + cellWidth = calculate colums, cellHeight, gutterWidth, gutterHeight

