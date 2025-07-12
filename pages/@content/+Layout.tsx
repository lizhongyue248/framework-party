import { PartyEffects } from "@/components/effect/party-effects"
import LanguageSwitch from "@/components/language-switch"
import { Link } from "@/components/link"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Toggle } from "@/components/ui/toggle"
import { useStore } from "@/lib/store"
import { REPO_PREFIX } from "@/lib/utils"
import type { ContentData } from "@/pages/@content/+data"
import { AppSidebar } from "@/pages/@content/components/app-sidebar"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Menu, Sparkles } from "lucide-react"
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
      <header className={"flex justify-between p-2 md:p-4 items-center border-b-2 h-(--header-height) backdrop-blur-sm"}>
        <div className="flex items-center space-x-2 sm:space-x-3 ">
          <div className="text-xl sm:text-2xl md:text-4xl text-purple-600 dark:text-purple-400">🥳</div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse">
            <span className="hidden sm:inline">Framework Party</span>
            <span className="sm:hidden">Framework</span>
          </h1>
        </div>
        <nav className={"hidden lg:flex flex-row gap-2"}>
          {(contentData.nav ?? []).map((item) => (
            <a key={item.id} href={`/${item.id.replaceAll(REPO_PREFIX, "")}`} className={"text-sm text-primary"}>
              {item.name}
            </a>
          ))}
        </nav>
        <div className={"flex flex-row gap-1 md:gap-2"}>
          <ThemeSwitch />
          <LanguageSwitch />
          <Button variant="secondary" size="icon" className="size-7 md:size-8" onClick={() => window.open("https://github.com/lizhongyue248/framework-party")}>
            <SiGithub />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="lg:hidden size-7 md:size-8">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {(contentData.nav ?? []).map((item) => (
                <DropdownMenuItem key={item.id} className={"border-b"} asChild>
                  <Link href={`/${item.id.replaceAll(REPO_PREFIX, "")}`}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

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
    </div>
  )
}

export default ContentLayout
