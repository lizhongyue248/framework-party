import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import type React from "react"
import { SidebarProvider } from "./ui/sidebar"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
      <Toaster />
    </ThemeProvider>
  )
}

export default AppProvider
