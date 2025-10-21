// @ts-check

/** @type { import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig } */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],

  importOrder: [
    "<BUILTIN_MODULES>",
    "<TYPES>",
    "^@repo/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@server/(.*)$",
    "^./(.*)$"
  ],

  semi: true,
  quoteProps: "as-needed",
  arrowParens: "always",
  experimentalTernaries: true,
  htmlWhitespaceSensitivity: "strict",
  singleAttributePerLine: true,
  trailingComma: "none"
};

export default config;
