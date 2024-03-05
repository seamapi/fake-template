import { defineConfig } from "tsup"

export default defineConfig({
  tsconfig: "tsconfig.build.json",
  entry: ["src/index.ts", "src/server.ts"],
  format: "esm",
  treeshake: true,
  dts: true,
  sourcemap: true,
})
