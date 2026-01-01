import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "node",
    globals: true,
    environment: "node",
    include: ["src/**/*.spec.ts", "src/**/*.test.ts"],
  },
});
