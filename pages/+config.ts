import vikeReactZustand from "vike-react-zustand/config"
import vikeReact from "vike-react/config"
import type { Config } from "vike/types"
import Head from "../layouts/HeadDefault"
import Layout from "../layouts/LayoutDefault"

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,
  Head,

  // https://vike.dev/head-tags
  passToClient: ["nav", "sidebar", "locale", "urlLogical"],
  prerender: true,
  // https://vike.dev/stream
  stream: true,
  // https://vike.dev/ssr - this line can be removed since `true` is the default
  ssr: true,
  extends: [vikeReact, vikeReactZustand],
  htmlAttributes: { class: "" }
} satisfies Config
