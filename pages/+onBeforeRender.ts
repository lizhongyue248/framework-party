import fs from "node:fs"
import path from "node:path"
import type { ContentSidebarData, NavData } from "@/types"
import type { PageContextServer } from "vike/types"

const readJsonFile = <T>(filename: string): T => {
  const contentDir = path.resolve(process.cwd(), "content/generateContent")
  const filePath = path.join(contentDir, filename)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileContent) as T
}

const onBeforeRender = async (pageContext: PageContextServer) => {
  const navData = readJsonFile<NavData[]>("nav.json")
  const sidebarList = readJsonFile<ContentSidebarData[]>("sidebar.json")
  const sidebarData = sidebarList.find((item) => item.content === pageContext.routeParams.content)
  console.log("pageContext", pageContext.routeParams.content)
  return {
    pageContext: {
      nav: navData,
      sidebar: sidebarData
    }
  }
}
export default onBeforeRender
