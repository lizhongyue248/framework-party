import fs from "node:fs"
import path from "node:path"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRepoName = (repoUrl: string): string => {
  const cleanUrl = repoUrl.endsWith("/") ? repoUrl.slice(0, -1) : repoUrl
  let repoName = cleanUrl.split("/").pop() || ""
  if (repoName.includes(":")) {
    repoName = repoName.split(":").pop() || ""
  }
  return repoName.replace(/\.git$/, "")
}

export const readJsonFile = <T>(filename: string): T => {
  const contentDir = path.resolve(process.cwd(), "content/generateContent")
  const filePath = path.join(contentDir, filename)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileContent) as T
}

export const getFileName = (path: string): string => {
  return path.split("/").pop() || path
}
