module.exports = {
  presets: ['es2015'],
  bail: true,
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/js/**/*.js'],
  coveragePathIgnorePatterns: ['src/index.js'],
  setupFiles: [],
};
