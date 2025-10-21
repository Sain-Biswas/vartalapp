//  @ts-check

/** @type { import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import("@ianvs/prettier-plugin-sort-imports").PluginConfig } */
const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@ianvs/prettier-plugin-sort-imports'
  ],

  tailwindStylesheet: './src/index.css',
  tailwindFunctions: ['cva', 'cn', 'clsx', 'twMerge'],

  importOrder: [
    '<BUILTIN_MODULES>',
    '^@web/assets/(.*)$',
    '^(react/(.*)$)|^(react$)',
    '^@repo/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@server/(.*)$',
    '^@web/integrations/(.*)$',
    '^@web/shadcn/(.*)$',
    '^@web/components/(.*)$',
    '^@web/(.*)$',
    '^./(.*)$'
  ],

  semi: true,
  singleQuote: false,
  trailingComma: 'none',
  quoteProps: 'consistent',
  htmlWhitespaceSensitivity: 'strict'
};

export default config;
