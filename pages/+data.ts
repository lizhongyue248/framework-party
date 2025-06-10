import fs from "node:fs"
import path from "node:path"
import type { Content } from "@/types"
import type { PageContextServer } from "vike/types"

export type IndexData = {
  contentList: Content[]
}

export default async function data(_pageContext: PageContextServer): Promise<IndexData> {
  const contentDir = path.resolve(process.cwd(), "content/generateContent")
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json") && file.startsWith("framework-"))
  const contentList: Content[] = []
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const contentString = fs.readFileSync(filePath, "utf-8")
    const content = JSON.parse(contentString) as Content
    contentList.push(content)
  }

  return {
    contentList
  }
}
