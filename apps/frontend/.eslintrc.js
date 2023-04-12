module.exports = {
  env: {
    node: true,
    browser: true
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'import', 'prettier'],
  rules: {
    'simple-import-sort/exports': 1,
    'simple-import-sort/imports': 1,
    '@next/next/no-img-element': 0,
    'react-hooks/exhaustive-deps': 0
  }
};
