import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import mkcert from "vite-plugin-mkcert"

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
      "/WeatherForecast": {
        target: "https:localhost:7137",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/^/WeatherForecast/", "/WeatherForecast"),
      },
    },
  },
})
