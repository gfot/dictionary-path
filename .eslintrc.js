module.exports = {
  extends: ['prettier', 'standard'],
  plugins: ['prettier'],
  env: {
    es6: true,
    mocha: true
  },
  rules: {
    semi: [2, 'always'],
    'space-before-function-paren': ['error', 'never']
  }
};
