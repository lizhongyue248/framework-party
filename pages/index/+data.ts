import fs from "node:fs"
import path from "node:path"
import type { Content } from "@/types"
import type { PageContextServer } from "vike/types"

export default async function data(_pageContext: PageContextServer): Promise<Content[]> {
  const contentDir = path.resolve(process.cwd(), "content/generateContent")
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json"))
  const contentList: Content[] = []
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const content = fs.readFileSync(filePath, "utf-8")
    contentList.push(JSON.parse(content) as Content)
  }

  return contentList
}
