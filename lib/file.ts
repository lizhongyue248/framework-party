// Only server
import fs from "node:fs"
import path from "node:path"
import type { Content } from "@/types"
import type { I18nData } from "@/types/i18n"

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
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json") && file.startsWith("framework-party-"))
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

export const getAllFrameworkContents = (locale: "zh" | "en" = "en"): Content[] => {
  const contentDir = path.resolve(process.cwd(), `content/generateContent/${locale}`)
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json") && file.startsWith("framework-party-"))
  const contents: Content[] = []
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const contentString = fs.readFileSync(filePath, "utf-8")
    const content = JSON.parse(contentString) as Content
    contents.push(content)
  }
  return contents
}

export const getLocaleData = (locale: "zh" | "en" = "en"): I18nData => {
  const filePath = path.resolve(process.cwd(), `content/i18n/data.${locale}.json`)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileContent) as I18nData
}
