import "./style.css"
import "./tailwind.css"

import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import { usePageContext } from "vike-react/usePageContext"
import type { PageContext } from "vike/types"

export default function LayoutDefault({ children}: { children: React.ReactNode }) {
  const pageContext = usePageContext()
  return (
    // <ThemeProvider>
    <div className={"w-full h-screen"}>
      <header className={"flex justify-between p-4"}>
        <h1 className={"text-3xl font-bold"}>Framework Party</h1>
        <nav className={"flex flex-row gap-2"}>
          {(pageContext.nav ?? []).map((item) => (
            <a key={item.id} href={`/${item.id}`} className={"text-sm text-gray-600 hover:text-gray-900"}>
              {item.name}
            </a>
          ))}
        </nav>
        <div>test</div>
      </header>
      {children}
    </div>
    // </ThemeProvider>
  )
}
