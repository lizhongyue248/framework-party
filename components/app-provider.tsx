import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import { SidebarProvider } from "./ui/sidebar"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  )
}

export default AppProvider
