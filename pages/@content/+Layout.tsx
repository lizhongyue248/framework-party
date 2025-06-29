import { PartyEffects } from "@/components/effect/party-effects"
import LanguageSwitch from "@/components/language-switch"
import { Link } from "@/components/link"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { useStore } from "@/lib/store"
import { REPO_PREFIX } from "@/lib/utils"
import type { ContentData } from "@/pages/@content/+data"
import { AppSidebar } from "@/pages/@content/components/app-sidebar"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Sparkles } from "lucide-react"
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
    <div className={"w-full min-h-screen flex flex-col [--header-height:calc(--spacing(14))]"}>
      <PartyEffects line={false} />
      <header className={"flex justify-between p-4 items-center border-b-2 h-(--header-height) backdrop-blur-sm"}>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          </div>
          <h1 className={"text-xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent"}>
            <Link href={"/"}>Framework Party</Link>
          </h1>
        </div>
        <nav className={"flex flex-row gap-2"}>
          {(contentData.nav ?? []).map((item) => (
            <a key={item.id} href={`/${item.id.replaceAll(REPO_PREFIX, "")}`} className={"text-sm text-primary"}>
              {item.name}
            </a>
          ))}
        </nav>
        <div className={"flex flex-row gap-2"}>
          <ThemeSwitch />
          <LanguageSwitch />
          <Button variant="secondary" size="icon" className="size-8" onClick={() => window.open("https://github.com/lizhongyue248/framework-party")}>
            <SiGithub />
          </Button>
        </div>
      </header>

      <div className={"flex-1 flex flex-row"}>
        <AppSidebar sidebarData={contentData.sidebar} />
        <div className={"h-full w-full"}>
          <div className={"flex flex-row gap-4 py-2 overflow-x-auto px-8 border-b-2"}>
            {contentData.currentContent?.framework.map((framework) => (
              <Toggle
                variant={"outline"}
                key={`framework-${framework.name}`}
                pressed={activeFrameworks.includes(framework.name)}
                onPressedChange={() => handleFrameworkToggle(framework.name)}
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
    </div>
  )
}

export default ContentLayout
