import globals from "globals";
import pluginJs from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["*", "!src"],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  jsdoc.configs["flat/recommended"],
  eslintConfigPrettier,
  // other configuration objects...
  {
    files: ["src/**/*.js"],
    plugins: {
      jsdoc,
    },
    rules: {
      "jsdoc/require-description": "warn",
      "jsdoc/require-returns-type": "off",
    },
  },
];
