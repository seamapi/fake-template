import { defineConfig } from "tsup"

export default defineConfig({
  tsconfig: "tsconfig.build.json",
  entry: ["src/index.ts", "src/server.ts"],
  format: ["cjs", "esm"],
  treeshake: true,
  dts: true,
  sourcemap: true,
})
