module.exports = {
  presets: ['es2015'],
  bail: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['src/index.js'],
  setupFiles: [],
};
