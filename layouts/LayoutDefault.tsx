import "./style.css"
import "./tailwind.css"

import AppProvider from "@/components/app-provider"
import type React from "react"
import { usePageContext } from "vike-react/usePageContext"

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext()
  return (
    <AppProvider>
      <div className={"w-full min-h-screen flex flex-col"}>{children}</div>
    </AppProvider>
  )
}
