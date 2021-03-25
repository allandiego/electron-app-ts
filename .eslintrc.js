module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react', '@typescript-eslint', 'import', 'react-hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   ecmaVersion: 2018,
  //   sourceType: 'module',
  // },
  rules: {
    'prettier/prettier': 'error',

    'global-require': 'off',
    'class-methods-use-this': 'off',

    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',

    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',

    '@typescript-eslint/no-unused-vars': 'error',
    // '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    // 'no-unused-vars': 'off',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // prettier removing parenthesis from multiline control={(<Switch />)} >  control={<Switch />}
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false },
    ],

    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off', // ref.current?.function()
    camelcase: 'off',

    // electron import
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    // allow single export without default in a file
    'import/prefer-default-export': 'off',
    // allow imports without specify this extensions
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
  },
  settings: { 'import/resolver': { typescript: {} } },
};
