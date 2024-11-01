import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api/v1": {
        target: "http://localhost:8000/api/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ""),
      },
    },
  },
});
