import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: "MyReact.createElement",
  },
  server: {
    open: true,
  },
});
