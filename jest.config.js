/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // testRegex: "__tests__/.*.e2e.test.ts$",
  testMatch: ["__tests__/.*.e2e.test.ts$", "**/?(*.)+(spec|test).ts"],
  // globalSetup: "./__tests__/jest.setup.ts",
  // globalTeardown: "./__tests__/jest.teardown.ts",
  // testEnvironment: "node",
};
// export default {
//   globalSetup: "./jest.setup.js",
//   globalTeardown: "./jest.teardown.js",
//   testEnvironment: "node",
// };
