import { readJsonFile } from "@/lib/utils"
import type { ContentData } from "@/pages/@content/+data"
import type { ContentSidebarData, NavData } from "@/types"
import type { OnBeforePrerenderStartAsync } from "vike/types"

export const onBeforePrerenderStart: OnBeforePrerenderStartAsync<ContentData> = async (): ReturnType<OnBeforePrerenderStartAsync<ContentData>> => {
  const navData = readJsonFile<NavData[]>("nav.json")
  const sidebarList = readJsonFile<ContentSidebarData[]>("sidebar.json")
  return sidebarList.map((content) => {
    const url = `/${content.content}`
    return {
      url,
      pageContext: {
        data: {
          nav: navData,
          sidebar: content
        }
      }
    }
  })
}
