module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: [
    'metro.config.js',
    'babel.config.js',
    'jest.config.js',
    'android/**',
    'ios/**',
    'node_modules/**',
  ],
  overrides: [
    {
      files: [
        '**/*.config.js',
        'metro.config.js',
        'babel.config.js',
        'jest.config.js',
      ],
      env: { node: true },
    },
  ],
};
