import * as fs from "node:fs"
import path from "node:path"
import type { Content, Framework, TaskContext } from "@/types"
import { type DefaultRenderer, Listr, type ListrTaskWrapper } from "listr2"
import simpleGit from "simple-git"
import { type EnvironmentOptions, type Plugin, type ResolvedConfig, loadEnv } from "vite"
import YAML from "yaml"

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

const getRepoName = (repoUrl: string): string => {
  const cleanUrl = repoUrl.endsWith("/") ? repoUrl.slice(0, -1) : repoUrl
  let repoName = cleanUrl.split("/").pop() || ""
  if (repoName.includes(":")) {
    repoName = repoName.split(":").pop() || ""
  }
  return repoName.replace(/\.git$/, "")
}

const contentPlugin = async (mode: string): Promise<Plugin> => {
  return {
    name: "content-plugin",
    version: "1.0.0",
    configEnvironment(name: string, options: EnvironmentOptions) {},
    buildStart: async (options) => {
      const contentList = readContentFile()
      const taskList = new Listr<TaskContext>([])
      for (const content of contentList) {
        const repoName = getRepoName(content.repository)
        const targetDir = `tmp/${repoName}`
        const subTaskList = new Listr<TaskContext>([])
        for (const framework of content.framework) {
          subTaskList.add({
            title: `Processing framework ${framework.name}`,
            task: async (context, task) => {
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
              fs.writeFileSync(`content/generateContent/${repoName}.json`, JSON.stringify(content, null, 2))
            }
          })
        }
        taskList.add({
          title: `Processing ${content.name}`,
          task: async (context, task) => {
            const git = simpleGit()
            try {
              if (fs.existsSync(targetDir)) {
                task.output = `Repository ${repoName} already exists, updating...`
                const repoGit = simpleGit(targetDir)
                await repoGit.pull("origin")
              } else {
                task.output = `Cloning repository ${repoName}...`
                await git.clone(content.repository, targetDir, {})
              }
            } catch (e) {
              task.output = `Error: ${e}`
            }
            return subTaskList
          }
        })
      }
      await taskList.run()
    }
  }
}

export default contentPlugin
