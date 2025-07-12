import { AppHeader } from "@/components/app-header"
import { PartyEffects } from "@/components/effect/party-effects"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Toggle } from "@/components/ui/toggle"
import { useIsMobile } from "@/hooks/use-mobile"
import { useStore } from "@/lib/store"
import type { ContentData } from "@/pages/@content/+data"
import { AppSidebar } from "@/pages/@content/components/app-sidebar"
import type React from "react"
import { useEffect } from "react"
import { useData } from "vike-react/useData"

const FRAMEWORK_KEY = "frameworks"

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const contentData = useData<ContentData>()
  const { activeFrameworks, setActiveFrameworks } = useStore()
  const isMobile = useIsMobile()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const frameworks = urlParams.get("frameworks")
    if (frameworks) {
      setActiveFrameworks(frameworks.split(","))
    } else if (activeFrameworks.length === 0 && contentData.currentContent?.framework && contentData.currentContent.framework.length > 0) {
      setActiveFrameworks([contentData.currentContent.framework[0].name])
    }
  }, [contentData.currentContent])

  const handleFrameworkToggle = async (framework: string) => {
    let newFrameworks: string[]
    if (activeFrameworks.includes(framework)) {
      newFrameworks = activeFrameworks.filter((f) => f !== framework)
      if (newFrameworks.length === 0 && contentData.currentContent?.framework && contentData.currentContent.framework.length > 0) {
        newFrameworks = [contentData.currentContent.framework[0].name]
      }
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
    <div className={"w-full min-h-screen flex flex-col [--header-height:calc(--spacing(14))]"}>
      <PartyEffects line={false} />
      <AppHeader navItems={contentData.nav} className="flex border-purple-200/50 dark:border-purple-700/50 justify-between p-4 md:p-6 items-center border-b-2 backdrop-blur-sm" />

      <div className={"flex-1 flex flex-row"}>
        <AppSidebar sidebarData={contentData.sidebar} />
        <div className={"h-full w-full"}>
          <div className={"flex flex-row flex-nowrap gap-4 py-2 overflow-x-auto px-8 border-b-2"}>
            {contentData.currentContent?.framework.map((framework) => (
              <Toggle
                variant={"outline"}
                key={`framework-${framework.name}`}
                pressed={activeFrameworks.includes(framework.name)}
                onPressedChange={() => handleFrameworkToggle(framework.name)}
                className="flex-shrink-0"
              >
                <img className={"w-4 h-4"} src={framework.logo} alt={framework.name} />
                {framework.name}
              </Toggle>
            ))}
          </div>
          <div id={"container"} className={"flex-1 w-full overflow-auto px-8 h-[calc(100svh-var(--header-height)-4rem)]!"}>
            {children}
          </div>
        </div>
      </div>

      {/* 移动端浮动按钮 */}
      {isMobile && (
        <div className="fixed bottom-4 left-4 z-50">
          <SidebarTrigger className="size-12 cursor-pointer rounded-full bg-background text-primary shadow-gray-500 shadow-lg hover:shadow-xl transition-shadow" />
        </div>
      )}
    </div>
  )
}

export default ContentLayout
