import "./style.css"
import "./tailwind.css"

import AppProvider from "@/components/app-provider"
import type React from "react"

const LayoutDefault = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider>
      <div className={"w-full min-h-screen flex flex-col"}>{children}</div>
    </AppProvider>
  )
}

export default LayoutDefault
