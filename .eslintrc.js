/* eslint-env node */
// Prettier has a rigidly sectarian formatting standard
// This is why we do not run it
// https://github.com/prettier/prettier/issues/5246
// https://github.com/prettier/prettier/issues/5501
module.exports = {
  root: true,
  extends: [
    "plugin:import/recommended",
    "plugin:import/warnings",
    "plugin:import/errors",
    "plugin:import/typescript",
    "@vue/typescript/recommended",
    "plugin:vue/vue3-recommended",
  ],
  rules: {
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always",
      },
    ],
  },
};
