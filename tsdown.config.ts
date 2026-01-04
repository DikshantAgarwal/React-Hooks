import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/hooks/index.js"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2018",
});
