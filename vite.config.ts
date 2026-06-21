import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});