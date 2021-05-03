import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: `import MyReact from './myReact'`,
    jsxFactory: "MyReact.createElement",
    jsxFragment: "MyReact.Fragment",
  },
  server: {
    open: true,
  },
});
