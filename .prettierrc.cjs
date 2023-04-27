// UPSTREAM: https://github.com/xojs/xo/issues/491#issuecomment-778194989
const defaults = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  requirePragma: false,
  insertPragma: false,
  useTabs: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: false,
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  rangeStart: 0,
  rangeEnd: Number.POSITIVE_INFINITY,
}

module.exports = {
  ...defaults,
  semi: false,
}
