import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { useStore } from "@/lib/store"
import type { ContentData } from "@/pages/@content/+data"
import { MoonIcon, SunIcon } from "lucide-react"
import type React from "react"
import { useEffect } from "react"
import { useData } from "vike-react/useData"

const FRAMEWORK_KEY = "frameworks"

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const contentData = useData<ContentData>()
  const { activeFrameworks, setActiveFrameworks, theme, setTheme } = useStore()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const frameworks = urlParams.get("frameworks")
    if (frameworks) {
      setActiveFrameworks(frameworks.split(","))
    }
  }, [])

  const handleFrameworkToggle = async (framework: string) => {
    let newFrameworks: string[]
    if (activeFrameworks.includes(framework)) {
      newFrameworks = activeFrameworks.filter((f) => f !== framework)
    } else {
      newFrameworks = [...activeFrameworks, framework]
    }
    setActiveFrameworks(newFrameworks)
    const url = new URL(window.location.href)
    if (newFrameworks.length > 0) {
      url.searchParams.set(FRAMEWORK_KEY, newFrameworks.join(","))
    } else {
      url.searchParams.delete(FRAMEWORK_KEY)
    }
    window.history.pushState({}, "", url)
  }

  return (
    <div className={"w-full min-h-screen flex flex-col"}>
      <header className={"flex justify-between p-4 items-center"}>
        <h1 className={"text-xl font-bold"}>Framework Party</h1>
        <nav className={"flex flex-row gap-2"}>
          {(contentData.nav ?? []).map((item) => (
            <a key={item.id} href={`/${item.id}`} className={"text-sm text-gray-600 hover:text-gray-900"}>
              {item.name}
            </a>
          ))}
        </nav>
        <div className={"flex flex-row gap-2"}>
          <Button variant="secondary" size="icon" className="size-8" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          </Button>
        </div>
      </header>
      <Separator />

      <ResizablePanelGroup className={"flex-1 flex flex-row"} direction="horizontal">
        <ResizablePanel maxSize={20} minSize={12} defaultSize={12}>
          <AppSidebar sidebarData={contentData.sidebar} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className={"h-full w-full"}>
          <div className={"flex flex-row gap-4 py-2 overflow-x-auto px-8 border-b"}>
            {contentData.currentContent?.framework.map((framework) => (
              <Toggle
                variant={"outline"}
                key={`framework-${framework.name}`}
                pressed={activeFrameworks.includes(framework.name)}
                onPressedChange={() => handleFrameworkToggle(framework.name)}
              >
                {framework.name}
              </Toggle>
            ))}
          </div>
          <div className={"flex-1 w-full overflow-auto px-8 scrollbar-thin"} style={{ height: "calc(100vh - 130px)" }}>
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ContentLayout
