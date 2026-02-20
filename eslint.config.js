module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  plugins: ["react", "import"],
  rules: {
    "import/no-unresolved": "error", // catch bad imports
    "no-unused-vars": "warn",        // warn for unused vars
    "react/prop-types": "off",       // optional: skip prop-types
    "react/react-in-jsx-scope": "off" // React 17+ doesn't require import React
  },
  settings: {
    react: {
      version: "detect", // auto-detect React version
    },
  },
};