module.exports = {
  env: {
    'react-native/react-native': true,
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    'no-console': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'consistent-return': 'off',
    'react/jsx-no-bind': 'off',
    'no-underscore-dangle': 'off',
    'react/no-unused-state': 'off',
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': ['error', { variables: false }],
    'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions', allow: [] }],
  },
};
