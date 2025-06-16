import fs from "node:fs"
import path from "node:path"
import { localeDefault } from "@/lib/locale"
import { getRepoName, readJsonFile } from "@/lib/utils"
import type { Content, ContentSidebarData, NavData } from "@/types"
import type { PageContextClient, PageContextServer } from "vike/types"

export interface ContentData {
  currentContent?: Content
  nav: NavData[]
  sidebar: ContentSidebarData
}

export const data = (pageContext: PageContextServer | PageContextClient) => {
  const locale = pageContext.locale || localeDefault

  const navData = readJsonFile<NavData[]>("nav.json", locale)
  const sidebarList = readJsonFile<ContentSidebarData[]>("sidebar.json", locale)
  const sidebarData = sidebarList.find((item) => item.content === pageContext.routeParams.content)

  const contentDir = path.resolve(process.cwd(), `content/generateContent/${locale}`)
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json") && file.startsWith("framework-"))
  let currentContent: Content | undefined = undefined
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const contentString = fs.readFileSync(filePath, "utf-8")
    const content = JSON.parse(contentString) as Content
    const repoName = getRepoName(content.repository)
    if (pageContext.routeParams.content === repoName) {
      currentContent = content
    }
  }
  return {
    nav: navData,
    sidebar: sidebarData,
    currentContent
  }
}
