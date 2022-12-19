module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ['prettier', '@typescript-eslint', 'simple-import-sort'],
  settings: {
    node: {
      resolvePaths: [__dirname],
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
    'no-case-declarations': 'warn',
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}
