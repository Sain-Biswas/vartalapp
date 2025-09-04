import stylistic from "@stylistic/eslint-plugin";
// @ts-expect-error
import drizzle from "eslint-plugin-drizzle";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const configuration = defineConfig(
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
stylistic.configs.customize({
semi: true,
quotes:"double",
arrowParens: true,
}),
  {
    plugins: {
      drizzle,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals:{
        addEventListener: false,
        ...globals.node
      }
    },
    rules:{
      ...drizzle.configs.recommended.rules,
    }
  },

)

export default configuration;
