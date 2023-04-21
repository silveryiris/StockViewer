import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import mkcert from "vite-plugin-mkcert"

const API_SERVER_LOCATION = "https://localhost:7137"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mkcert()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    https: true,
    proxy: {
      "/swagger": {
        target: `${API_SERVER_LOCATION}`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/^/swagger/", "/swagger"),
      },
      "/api": {
        target: `${API_SERVER_LOCATION}`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/^/api/", "/api"),
      },
    },
  },
})
