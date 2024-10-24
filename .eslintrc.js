module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'import',
    'node',
    'promise',
  ],
  rules: {
    // Add any custom rules here
  },
};
