module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'prettier'],
  plugins: ['react', 'prettier'],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    l: true,
  },
  rules: {
    'func-names': ['error', 'never'],
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-confusing-arrow': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-double'],
    'comma-dangle': ['error', 'always-multiline'],
    'valid-jsdoc': ['error'],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: ['app', 'node_modules'],
            extensions: ['.js', '.jsx', '.css'],
            alias: {
              'component-styles': 'css/components',
            },
          },
        },
      },
    },
  },
};
