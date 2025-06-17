// Only server
import fs from "node:fs"
import path from "node:path"
import type { Content } from "@/types"

export const getRepoName = (repoUrl: string): string => {
  const cleanUrl = repoUrl.endsWith("/") ? repoUrl.slice(0, -1) : repoUrl
  let repoName = cleanUrl.split("/").pop() || ""
  if (repoName.includes(":")) {
    repoName = repoName.split(":").pop() || ""
  }
  return repoName.replace(/\.git$/, "")
}

export const readJsonFile = <T>(filename: string, locale: "zh" | "en" = "en"): T => {
  const contentDir = path.resolve(process.cwd(), `content/generateContent/${locale}`)
  const filePath = path.join(contentDir, filename)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileContent) as T
}

export const getCurrentContent = (current: string, locale: "zh" | "en" = "en") => {
  const contentDir = path.resolve(process.cwd(), `content/generateContent/${locale}`)
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json") && file.startsWith("framework-"))
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const contentString = fs.readFileSync(filePath, "utf-8")
    const content = JSON.parse(contentString) as Content
    const repoName = getRepoName(content.repository)
    if (current === repoName) {
      return content
    }
  }
  return null
}
