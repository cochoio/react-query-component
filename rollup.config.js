import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "./src/index.ts",
  output: [
    {
      format: "es",
      file: "dist/index.js",
    },
    {
      format: "cjs",
      file: "dist/index.cjs.js",
      exports: "default",
    },
  ],
  external: ["react", "@tanstack/react-query"],
  plugins: [typescript()],
});
