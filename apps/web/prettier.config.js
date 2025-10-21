//  @ts-check

/** @type { import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import("@ianvs/prettier-plugin-sort-imports").PluginConfig } */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports"
  ],

  tailwindStylesheet: "./src/index.css",
  tailwindFunctions: ["cva", "cn", "clsx", "twMerge"],

  importOrder: [
    "<BUILTIN_MODULES>",
    "<TYPES>",
    "^@web/assets/(.*)$",
    "^(react/(.*)$)|^(react$)",
    "^@repo/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@server/(.*)$",
    "^@web/integrations/(.*)$",
    "^@web/shadcn/(.*)$",
    "^@web/components/(.*)$",
    "^@web/(.*)$",
    "^./(.*)$"
  ],

  semi: true,
  quoteProps: "as-needed",
  arrowParens: "always",
  endOfLine: "crlf",
  experimentalTernaries: true,
  htmlWhitespaceSensitivity: "strict",
  singleAttributePerLine: true,
  trailingComma: "none"
};

export default config;
