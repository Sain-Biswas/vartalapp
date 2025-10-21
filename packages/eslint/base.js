import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import tsESLint from "typescript-eslint";

/**
 * A base ESLint configuration for other libraries.
 *
 * Extend it to support other needs.
 *
 * @type { import("eslint").Linter.Config[] }
 */
export const baseESLintConfig = defineConfig([
  globalIgnores(["dist", "node_modules"]),
  tsESLint.configs.strict,
  tsESLint.configs.stylistic,
  pluginJs.configs.recommended,
  pluginPrettier,
]);
