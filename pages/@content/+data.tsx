import { REPO_PREFIX, getCurrentContent, readJsonFile } from "@/lib/file"
import { localeDefault } from "@/lib/locale"
import type { Content, ContentSidebarData, NavData } from "@/types"
import type { PageContextClient, PageContextServer } from "vike/types"

export interface ContentData {
  currentContent: Content | null
  nav: NavData[]
  sidebar: ContentSidebarData
}

export const data = (pageContext: PageContextServer | PageContextClient) => {
  const locale = pageContext.locale || localeDefault

  const navData = readJsonFile<NavData[]>("nav.json", locale)
  const sidebarList = readJsonFile<ContentSidebarData[]>("sidebar.json", locale)
  const current = pageContext.routeParams.content.replaceAll(REPO_PREFIX, "")
  const sidebarData = sidebarList.find((item) => item.content.replaceAll(REPO_PREFIX, "") === current)
  const currentContent = getCurrentContent(current, locale)
  return {
    nav: navData,
    sidebar: sidebarData,
    currentContent
  }
}
