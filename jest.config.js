const testMatchPrefix = process.env.PACKAGE
  ? `**/packages/${process.env.PACKAGE}/src/**`
  : "**";
const collectCoveragePrefix = process.env.PACKAGE ? process.env.PACKAGE : "**";

module.exports = {
  // testEnvironment: 'node',
  testMatch:
    process.env.E2E === "none"
      ? [`${testMatchPrefix}/?*.(spec|test).(j|t)s?(x)`]
      : [`${testMatchPrefix}/?*.(spec|test|e2e).(j|t)s?(x)`],
  testPathIgnorePatterns: ["/.git/", "/node_modules/", "/examples/", "/lib/"],
  moduleNameMapper: {
    "^umi/_runtimePlugin$": require.resolve("umi/lib/runtimePlugin"),
    "^@tmp/history": require.resolve("umi/lib/createHistory")
  },
  collectCoverageFrom: [
    `packages/${collectCoveragePrefix}/src/**/*.{js,jsx,ts,tsx}`,
    "!**/ui.umd.js",
    "!**/fixtures/**",
    "!**/ui/**",
    "!**/examples/**",
    "!**/locales/**",
    "!**/typings/**",
    "!**/types/**"
  ]
};