export default {
  ignoredByWatcher: ["tmp/**/*", ".edgespec"],
  files: ["**/*.test.ts", "!package/**/*"],
  environmentVariables: {
    NODE_ENV: "test",
  },
  extensions: {
    ts: "commonjs",
  },
  nodeArguments: ["--import=tsx"],
}
