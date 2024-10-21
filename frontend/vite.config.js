import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/apiV2/": {
        target: "https://datos.cali.gov.co/dataset",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ""),
      },
      "/api": {
        target: "https://otroservicio.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, ""),
      },
    },
  },
});
