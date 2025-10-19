//  @ts-check

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: "none",

  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/index.css",
};

export default config;
