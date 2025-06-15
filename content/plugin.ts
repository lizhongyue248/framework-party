import * as fs from "node:fs"
import path from "node:path"
import { Listr } from "listr2"
import simpleGit from "simple-git"
import type { EnvironmentOptions, Plugin } from "vite"
import YAML from "yaml"
import { getRepoName } from "../lib/utils"
import type { Content, ContentSidebarData, NavData, SidebarItemData, SidebarListData } from "../types"

const readContentFile = () => {
  const contentDir = path.resolve("content/repository")
  const contents = []

  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir)

    for (const file of files) {
      if (file.endsWith(".yaml") || file.endsWith(".yml")) {
        const filePath = path.join(contentDir, file)
        try {
          const contentString = fs.readFileSync(filePath, "utf-8")
          const content = YAML.parse(contentString, { merge: true }) as Content
          contents.push(content)
        } catch (error) {
          console.error(`Error parsing YAML file ${file}:`, error)
        }
      }
    }
  } else {
    console.warn(`Directory ${contentDir} does not exist`)
  }

  return contents
}

const contentPlugin = async (): Promise<Plugin> => {
  return {
    name: "content-plugin",
    version: "1.0.0",
    configEnvironment(name: string, options: EnvironmentOptions) {},
    buildStart: async (options) => {
      const contentList = readContentFile()
      const taskList = new Listr([])
      const navList: NavData[] = []
      const sidebarContent: ContentSidebarData[] = []
      for (const content of contentList) {
        const repoName = getRepoName(content.repository)
        const targetDir = `tmp/${repoName}`
        navList.push({
          name: content.name,
          id: repoName
        })
        taskList.add({
          title: `Processing ${content.name}`,
          task: async (_, task) => {
            const git = simpleGit()
            try {
              if (fs.existsSync(targetDir)) {
                // task.output = `Repository ${repoName} already exists, updating...`
                // const repoGit = simpleGit(targetDir)
                // await repoGit.pull("origin")
              } else {
                task.output = `Cloning repository ${repoName}...`
                await git.clone(content.repository, targetDir, {})
              }
              for (const framework of content.framework) {
                for (const feature of framework.feature) {
                  for (const detail of feature.detail) {
                    for (const file of detail.file) {
                      const fileContentBuffer = fs.readFileSync(path.join(targetDir, file.path))
                      let fileContent = fileContentBuffer.toString()
                      if (file.startLine && file.endLine && file.endLine > file.startLine) {
                        const lines = fileContent.split("\n")
                        const updatedLines = lines.slice(file.startLine - 1, file.endLine)
                        fileContent = updatedLines.join("\n")
                      }
                      file.content = fileContent
                    }
                  }
                }
              }
              const contentSidebarData: SidebarListData[] = []
              for (const value of Object.values(content.definitions ?? {})) {
                const detailList = value["detail-list"].map((item) => ({ detail: item }) as SidebarItemData)
                const feature: SidebarListData = {
                  feature: value.name,
                  item: detailList
                }
                contentSidebarData.push(feature)
              }
              sidebarContent.push({
                content: repoName,
                data: contentSidebarData
              })
            } catch (e) {
              console.error(e)
              task.output = `Error: ${e}`
            }
          }
        })
      }
      await taskList.run()
      fs.writeFileSync("content/generateContent/nav.json", JSON.stringify(navList, null, 2))
      fs.writeFileSync("content/generateContent/sidebar.json", JSON.stringify(sidebarContent, null, 2))
    }
  }
}

export default contentPlugin
