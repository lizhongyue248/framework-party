import type React from "react"
import type { FC } from "react"
import { Link, useLocation } from "@remix-run/react"
import {
  type FileStructure,
  type FolderStructure,
  getGroupContent
} from "~/utils"
import CodeContent from "~/components/CodeContent"
import classNames from "classnames"

interface FolderStructureProps {
  folders: FolderStructure[]
  level?: number
  fileListGroup: { [key: string]: FileStructure[] }
  fileList: FileStructure[]
}

const FolderContent: FC<FolderStructureProps> = ({
  folders,
  fileListGroup,
  level = 1,
  fileList
}) => {
  const location = useLocation()
  return (
    <div>
      {folders.map((folder) => {
        const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements
        const groupContent = getGroupContent(folder, fileList, fileListGroup)
        return (
          <div key={folder.path} className={"relative"}>
            <HeadingTag
              className={classNames(
                "no-underline hover:underline scroll-mt-14 bg-base-100 group",
                level === 2 && "sticky z-10 top-12"
              )}
              id={folder.value}
            >
              <Link
                className={classNames(
                  "cursor-pointer no-underline float-left -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}
                preventScrollReset
                to={{ search: location.search, hash: `#${folder.value}` }}
              >
                #
              </Link>
              {folder.label}
            </HeadingTag>
            <div className={"grid grid-cols-2 gap-4"}>
              {groupContent.map((group) => (
                <CodeContent
                  key={`${folder.path}-${group.key}`}
                  group={group}
                />
              ))}
            </div>
            {folder.children && (
              <FolderContent
                folders={folder.children}
                level={level + 1}
                fileList={fileList}
                fileListGroup={fileListGroup}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FolderContent
