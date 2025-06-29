// Only server
import fs from "node:fs"
import path from "node:path"
import type { Content, FrameworkSupport, PartyInfo } from "@/types"
import type { I18nData } from "@/types/i18n"
const REPO_PREFIX = "framework-party-"

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
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json") && file.startsWith(REPO_PREFIX))
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const contentString = fs.readFileSync(filePath, "utf-8")
    const content = JSON.parse(contentString) as Content
    const repoName = getRepoName(content.repository)
    if (current === repoName.replaceAll(REPO_PREFIX, "")) {
      return content
    }
  }
  return null
}

export const getAllFrameworkContents = (locale: "zh" | "en" = "en"): Content[] => {
  const contentDir = path.resolve(process.cwd(), `content/generateContent/${locale}`)
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json") && file.startsWith(REPO_PREFIX))
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

export const getContentSummary = (frameworkContents: Content[]) => {
  const partyList: PartyInfo[] = []
  for (const content of frameworkContents) {
    const definitions = content.definitions
    const allDetail: string[] = []
    for (const definitionsKey in definitions) {
      const definition = definitions[definitionsKey]
      const detailList = definition["detail-list"]
      allDetail.push(...detailList)
    }
    const frameworkSupport: FrameworkSupport[] = []
    for (const framework of content.framework) {
      const featureSupport: Record<string, boolean> = {}
      for (const feature of framework.feature) {
        for (const detail of feature.detail) {
          featureSupport[detail.name] = allDetail.includes(detail.name)
        }
      }
      frameworkSupport.push({
        name: framework.name,
        logo: framework.logo,
        detail: featureSupport
      })
    }
    partyList.push({
      name: content.name,
      link: getRepoName(content.repository).replaceAll(REPO_PREFIX, ""),
      repo: content.repository,
      description: content.description,
      detailList: allDetail,
      frameworkSupport
    })
  }
  return partyList
}
