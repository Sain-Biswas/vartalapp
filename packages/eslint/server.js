import { defineConfig } from "eslint/config";
import globals from "globals";
import { baseESLintConfig } from "./base.js";

/**
 * A custom ESLint configuration for server applications.
 *
 * @type { import("eslint").Linter.Config[] }
 */
export const serverESLintConfig = defineConfig([
  ...baseESLintConfig,
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.node,
      },
    },
  },
]);
