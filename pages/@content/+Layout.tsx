import { AppSidebar } from "@/components/app-sidebar"
import LanguageSwitch from "@/components/language-switch"
import { Link } from "@/components/link"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { useStore } from "@/lib/store"
import type { ContentData } from "@/pages/@content/+data"
import { SiGithub } from "@icons-pack/react-simple-icons"
import type React from "react"
import { useEffect } from "react"
import { useData } from "vike-react/useData"

const FRAMEWORK_KEY = "frameworks"

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const contentData = useData<ContentData>()
  const { activeFrameworks, setActiveFrameworks } = useStore()
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
      <header className={"flex justify-between p-4 items-center border-b-2"}>
        <h1 className={"text-xl font-bold"}>
          <Link href={"/"}>Framework Party</Link>
        </h1>
        <nav className={"flex flex-row gap-2"}>
          {(contentData.nav ?? []).map((item) => (
            <a key={item.id} href={`/${item.id}`} className={"text-sm text-primary"}>
              {item.name}
            </a>
          ))}
        </nav>
        <div className={"flex flex-row gap-2"}>
          <LanguageSwitch />
          <ThemeSwitch />
          <Button variant="secondary" size="icon" className="size-8" onClick={() => window.open("https://github.com/lizhongyue248/framework-party")}>
            <SiGithub />
          </Button>
        </div>
      </header>

      <div className={"flex-1 flex flex-row"}>
        <AppSidebar sidebarData={contentData.sidebar} />
        <div className={"h-full w-full"}>
          <div className={"flex flex-row gap-4 py-2 overflow-x-auto px-8 border-b-2 backdrop-blur-lg bg-background/30 scrollbar-thin"}>
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
        </div>
      </div>
    </div>
  )
}

export default ContentLayout
