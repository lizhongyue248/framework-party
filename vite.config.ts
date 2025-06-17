import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import vike from "vike/plugin"
import { defineConfig } from "vite"
import contentPlugin from "./content/plugin"

export default defineConfig(() => {
  return {
    plugins: [react(), vike(), tailwindcss(), contentPlugin()],

    build: {
      target: "es2022"
    },
    resolve: {
      alias: {
        "@": new URL("./", import.meta.url).pathname
      }
    }
  }
})
