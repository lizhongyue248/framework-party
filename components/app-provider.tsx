import { Toaster } from "@/components/ui/sonner"
import type React from "react"
import { SidebarProvider } from "./ui/sidebar"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>{children}</SidebarProvider>
      <Toaster />
    </>
  )
}

export default AppProvider
