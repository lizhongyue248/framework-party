import { AppSidebar } from "@/components/app-sidebar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import type React from "react"
import { usePageContext } from "vike-react/usePageContext"

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const pageContext = usePageContext()
  return (
    <div className={"w-full min-h-screen flex flex-col"}>
      <header className={"flex justify-between p-4 items-center"}>
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
      <Separator />

      <ResizablePanelGroup className={"flex-1 flex flex-row"} direction="horizontal">
        <ResizablePanel defaultSize={24}>
          <AppSidebar sidebarData={pageContext.sidebar} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className={"flex-1"}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ContentLayout
