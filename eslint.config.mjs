import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Targets JavaScript and TypeScript files
  },
  {
    languageOptions: {
      globals: globals.node, // Use Node.js globals for TypeScript and JS
    },
  },
  pluginJs.configs.recommended, // ESLint recommended rules for JS
  ...tseslint.configs.recommended, // TypeScript ESLint recommended rules
  {
    rules: {
      "no-unused-vars": "error", // Disallow unused variables
      "no-undef": "error", // Disallow undefined variables
      "prefer-const": "error", // Suggest using `const` when variables are never reassigned
      "no-console": "warn", // Warn about using `console` (for production)
       "@typescript-eslint/no-require-imports": "off"
    },
  },
];
