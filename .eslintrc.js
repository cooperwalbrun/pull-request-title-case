module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked', 'prettier'],
  plugins: ['@typescript-eslint'],
  globals: {
    NodeJS: true,
    EXTENSION_NAME: 'readonly',
    EXTENSION_VERSION: 'readonly'
  },
  parserOptions: {
    project: true,
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
};
