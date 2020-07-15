module.exports = {
  env: {
    node: true,
    mocha: true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:mocha/recommended',
    'prettier'
  ],
  plugins: ['prettier', 'mocha'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': ['error', 'always'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'prettier/prettier': 'error',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'mocha/no-mocha-arrows': 'off',
    'mocha/no-hooks-for-single-case': 'off',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'should|expect'
      }
    ],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['should', 'sinon', 'mocha', 'supertest']
      }
    ],
    'import/no-dynamic-require': 'off',
  }
};
