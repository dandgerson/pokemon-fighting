const disableA11y = () => Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce(
  (acc, current) => ({
    ...acc,
    [`jsx-a11y/${current}`]: 'off',
  }),
  {},
)

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // parser: 'babel',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    ...disableA11y(),
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
      node: {
        paths: ['./src'],
        extensions: ['.js'],
      },
    },
  },
}
