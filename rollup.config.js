import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// Trasnpiled using Babel
export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs', // Use Common JS Modules
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // only transpile project source
    }),
  ],
};
