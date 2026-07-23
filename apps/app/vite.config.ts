import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    host: true,

    proxy: {
      "/api": {
        target: "http://192.168.68.78:8090",
        changeOrigin: true,
      },

      "/_": {
        target: "http://192.168.68.78:8090",
        changeOrigin: true,
      },
    },
  },
});