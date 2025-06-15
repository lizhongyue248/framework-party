import { readJsonFile } from "@/lib/utils"
import type { ContentSidebarData, NavData } from "@/types"
import type { PageContextClient, PageContextServer } from "vike/types"

export interface ContentData {
  nav: NavData[]
  sidebar: ContentSidebarData
}

export const data = (pageContext: PageContextServer | PageContextClient) => {
  const navData = readJsonFile<NavData[]>("nav.json")
  const sidebarList = readJsonFile<ContentSidebarData[]>("sidebar.json")
  const sidebarData = sidebarList.find((item) => item.content === pageContext.routeParams.content)
  return {
    nav: navData,
    sidebar: sidebarData
  }
}
