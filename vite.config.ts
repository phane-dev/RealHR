import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@page": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@composables": fileURLToPath(new URL("./src/composables", import.meta.url)),
      "@utilities": fileURLToPath(new URL("./src/utilities", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@json": fileURLToPath(new URL("./src/json", import.meta.url)),
    },
  },
})