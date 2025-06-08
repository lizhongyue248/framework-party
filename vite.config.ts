import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import vike from "vike/plugin"
import { defineConfig, loadEnv } from "vite"
import contentPlugin from "./content/plugin"

export default defineConfig(({ mode }) => {
  return {
    plugins: [vike(), react({}), tailwindcss(), contentPlugin(mode)],

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
