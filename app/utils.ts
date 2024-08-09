import * as fs from "node:fs"
import * as path from "node:path"

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
