import * as fs from "node:fs"
import path from "node:path"
import { Listr } from "listr2"
import { bundledLanguages, createHighlighter } from "shiki"
import simpleGit from "simple-git"
import type { Plugin } from "vite"
import YAML from "yaml"
import { getRepoName } from "../lib/utils"
import type { Content, ContentSidebarData, File, NavData, SidebarItemData, SidebarListData } from "../types"

const readContentFile = () => {
  const contentDir = path.resolve("content/repository")
  const contents = []
  const locales = []

  if (fs.existsSync(contentDir)) {
    const localeDirs = fs.readdirSync(contentDir).filter((dir) => fs.statSync(path.join(contentDir, dir)).isDirectory())
    for (const locale of localeDirs) {
      locales.push(locale)
      const localeDir = path.join(contentDir, locale)
      const files = fs.readdirSync(localeDir).filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))

      for (const file of files) {
        const filePath = path.join(localeDir, file)
        try {
          const contentString = fs.readFileSync(filePath, "utf-8")
          const content = YAML.parse(contentString, { merge: true }) as Content
          contents.push({ content, locale })
        } catch (error) {
          console.error(`Error parsing YAML file ${file}:`, error)
        }
      }
    }
  } else {
    console.warn(`Directory ${contentDir} does not exist`)
  }

  return { contents, locales }
}

const highlighter = await createHighlighter({
  themes: ["one-light", "one-dark-pro"],
  langs: Object.keys(bundledLanguages)
})

const processCodeFile = (targetDir: string, file: File) => {
  const fileContentBuffer = fs.readFileSync(path.join(targetDir, file.path))
  let fileContent = fileContentBuffer.toString()

  if (file.startLine && file.endLine && file.endLine > file.startLine) {
    const lines = fileContent.split("\n")
    const updatedLines = lines.slice(file.startLine - 1, file.endLine)
    fileContent = updatedLines.join("\n")
  }

  file.code = fileContent
  file.content = highlighter.codeToHtml(fileContent, {
    lang: file.language,
    themes: {
      light: "one-light",
      dark: "one-dark-pro"
    },
    transformers: [
      {
        pre(node) {
          node.properties.class = `${node.properties.class || ""} scrollbar-thin scrollbar-track-transparent`
          return node
        }
      }
    ]
  })
}

const processRepository = async (content: Content, repoName: string, sidebarContent: ContentSidebarData[], locale: string) => {
  const targetDir = `tmp/${repoName}`
  const git = simpleGit()

  try {
    if (!fs.existsSync(targetDir)) {
      await git.clone(content.repository, targetDir, {})
    } else {
      // const repoGit = simpleGit(targetDir)
      // await repoGit.pull("origin")
    }

    for (const framework of content.framework) {
      for (const feature of framework.feature) {
        for (const detail of feature.detail) {
          for (const file of detail.file) {
            processCodeFile(targetDir, file)
          }
        }
      }
    }

    const contentSidebarData: SidebarListData[] = []
    if (content.definitions) {
      for (const value of Object.values(content.definitions)) {
        const detailList = value["detail-list"].map((item) => ({ detail: item }) as SidebarItemData)
        contentSidebarData.push({
          feature: value.name,
          item: detailList,
          description: value.description
        })
      }
    }

    sidebarContent.push({
      content: repoName,
      data: contentSidebarData,
      description: content.description,
      repository: content.repository
    })

    // 确保目录存在
    const outputDir = `content/generateContent/${locale}`
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(`${outputDir}/${repoName}.json`, JSON.stringify(content, null, 2))
    return true
  } catch (e) {
    console.error(`Error processing repository ${repoName}:`, e)
    return false
  }
}
// 内容插件
const contentPlugin = async (): Promise<Plugin> => {
  return {
    name: "content-plugin",
    version: "1.0.0",
    buildStart: async () => {
      const { contents, locales } = readContentFile()

      for (const locale of locales) {
        const navList: NavData[] = []
        const sidebarContent: ContentSidebarData[] = []
        const taskList = new Listr([])

        // 确保输出目录存在
        const outputDir = `content/generateContent/${locale}`
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true })
        }

        // 过滤当前语言的内容
        const localeContents = contents.filter((item) => item.locale === locale).map((item) => item.content)

        for (const content of localeContents) {
          const repoName = getRepoName(content.repository)
          navList.push({
            name: content.name,
            id: repoName
          })
          taskList.add({
            title: `Processing ${content.name} (${locale})`,
            task: async (_, task) => {
              const result = await processRepository(content, repoName, sidebarContent, locale)
              if (!result) {
                task.output = `Failed to process ${content.name} (${locale})`
              }
            }
          })
        }
        await taskList.run()
        fs.writeFileSync(`${outputDir}/nav.json`, JSON.stringify(navList, null, 2))
        fs.writeFileSync(`${outputDir}/sidebar.json`, JSON.stringify(sidebarContent, null, 2))
      }
    }
  }
}

export default contentPlugin
