import fs from "node:fs"
import path from "node:path"
import type { NavData } from "@/types"
import type { PageContextServer } from "vike/types"
const onBeforeRender = async (pageContext: PageContextServer) => {
  const contentDir = path.resolve(process.cwd(), "content/generateContent")
  const filePath = path.join(contentDir, "nav.json")
  const navJson = fs.readFileSync(filePath, "utf-8")
  const navData: NavData[] = JSON.parse(navJson)
  return {
    pageContext: {
      nav: navData
    }
  }
}
export default onBeforeRender
