const { defaults } = require("jest-config");
module.exports = {
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: ["./client"]
};
