import * as fs from "node:fs"
import * as path from "node:path"
import _ from "lodash"

export const getLabel = (
  name: string | undefined | null,
  defaultValue = ""
): string => {
  if (name) {
    return name.replace(/^\d+-/, "").replace(/([a-z])([A-Z])/g, "$1 $2")
  }
  return defaultValue
}

export type Category = {
  label: string
  value: string
  path: string
  children: Category[]
}

export const getDirectoryStructure = (dirPath: string): Category[] => {
  const getFolders = (directory: string): Category[] => {
    return fs
      .readdirSync(directory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => {
        const dirName = dirent.name
        let label = dirName.replace(/^\d+-/, "")
        label = label.replace(/([a-z])([A-Z])/g, "$1 $2")
        return {
          label: label,
          value: dirName,
          path: path.resolve(directory, dirName),
          children: getFolders(path.resolve(directory, dirName))
        }
      })
  }

  const rootFolders = getFolders(dirPath)

  return rootFolders.map((folder) => ({
    ...folder,
    value: path.basename(folder.path)
  }))
}

export interface FolderStructure {
  label: string
  value: string
  path: string
  framework: string
  relativePath: string
  children: FolderStructure[]
}

export const readDirectoryRecursive = (
  dirPath: string,
  currentParent: string
): FolderStructure[] => {
  return fs
    .readdirSync(dirPath)
    .filter((fileOrFolder) =>
      fs.statSync(path.join(dirPath, fileOrFolder)).isDirectory()
    )
    .map((fileOrFolder) => {
      const fullPath = path.join(dirPath, fileOrFolder)
      const isDirectory = fs.statSync(fullPath).isDirectory()
      const relativePath = fullPath.replace(currentParent, "").split(path.sep)
      const framework = relativePath[1]
      relativePath.shift()
      relativePath.shift()
      const structure: FolderStructure = {
        label: getLabel(fileOrFolder),
        value: fileOrFolder,
        path: fullPath,
        framework,
        relativePath: relativePath.join(path.sep),
        children: isDirectory
          ? readDirectoryRecursive(fullPath, currentParent)
          : []
      }

      return structure
    })
}

export interface FileStructure {
  label: string
  value: string
  suffix: string
  parent: string
  framework: string
  path: string
  relative: string
  content: string
}

const readFilesRecursive = (
  dirPath: string,
  currentParent: string
): FileStructure[] => {
  const result: FileStructure[] = []

  const readDir = (currentPath: string) => {
    const items = fs.readdirSync(currentPath)
    for (const item of items) {
      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        readDir(fullPath)
      } else {
        const suffix = path.extname(item)
        const content = fs.readFileSync(fullPath, "utf-8")
        const relativePath = currentPath
          .replace(currentParent, "")
          .split(path.sep)
        const framework = relativePath[1]
        relativePath.shift()
        relativePath.shift()

        result.push({
          label: item,
          value: item,
          suffix: suffix,
          parent: currentPath,
          framework,
          relative: relativePath.join(path.sep),
          path: fullPath,
          content: content
        })
      }
    }
  }

  readDir(dirPath)

  return result
}

// 传入 path 数组并读取所有文件
export const processPaths = (
  paths: string[],
  currentParent: string
): FileStructure[] => {
  return paths.flatMap((dirPath) => readFilesRecursive(dirPath, currentParent))
}

export interface GroupContent {
  framework: string
  relative: string
  key: string
  files: FileStructure[]
}

export const getGroupContent = (
  folder: FolderStructure,
  fileList: FileStructure[],
  fileListGroup: {
    [p: string]: FileStructure[]
  }
) => {
  return _.uniqBy(
    fileList.filter(
      (item) =>
        item.relative === folder.relativePath &&
        Object.keys(fileListGroup).includes(
          `${item.framework}-${item.relative}`
        )
    ),
    (item) => `${item.framework}-${item.relative}`
  ).map(
    (item) =>
      ({
        framework: item.framework,
        relative: item.relative,
        key: `${item.framework}-${item.relative}`,
        files: fileListGroup[`${item.framework}-${item.relative}`]
      }) as GroupContent
  )
}
