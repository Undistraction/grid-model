import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// Trasnpiled using Babel
export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs', // Use Common JS Modules
  },
  plugins: [
    nodeResolve(),

    babel({
      exclude: 'node_modules/**', // only transpile project source
    }),
  ],
  external: [
    'lodash/isNil',
    'lodash/isNumber',
    'lodash/isInteger',
    'lodash/partial',
    'lodash/curry',
    'lodash/curryRight',
    'lodash/add',
    'lodash/subtract',
    'lodash/gt',
    'lodash/lt',
  ],
};
