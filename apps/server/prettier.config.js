// @ts-check

/** @type { import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig } */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],

  importOrder: [
    "<BUILTIN_MODULES>",
    "^@repo/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@server/(.*)$",
    "^./(.*)$",
  ],

  semi: true,
  singleQuote: false,
  trailingComma: "none",
  quoteProps: "consistent",
  htmlWhitespaceSensitivity: "strict",
};

export default config;
