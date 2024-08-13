import { Link, useLoaderData, useLocation, useSearchParams } from '@remix-run/react'
import classNames from "classnames"
import { type FC, Fragment, useMemo } from 'react'
import type { loader } from "~/routes/_index.($doctype)/route"
import { type FileStructure, type FolderStructure, getLabel } from "~/utils"
import _ from "lodash"

interface FolderStructureProps {
  folders: FolderStructure[]
  level?: number
  fileListGroup: { [key: string]: FileStructure[] }
  fileList: FileStructure[]
}

const FolderStructureComponent: FC<FolderStructureProps> = ({
  folders,
  fileListGroup,
  level = 1,
  fileList
}) => {
  const location = useLocation();
  return (
    <div>
      {folders.map((folder) => {
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

        return (
          <div key={folder.path}>
            <Link
              className={"no-underline hover:underline "}
              preventScrollReset
              to={{
                search: location.search,
                hash: `#${folder.value}`,
              }}
            >
              <HeadingTag className={"cursor-pointer"} id={folder.value}>{folder.label}</HeadingTag>
            </Link>

            <div className={"grid grid-cols-2 gap-4"}>
              {_.uniqBy(
                fileList.filter(
                  (item) =>
                    item.relative === folder.relativePath &&
                    Object.keys(fileListGroup).includes(
                      `${item.framework}-${item.relative}`
                    )
                ),
                (item) => `${item.framework}-${item.relative}`
              )
                .map((item) => ({
                  framework: item.framework,
                  relative: item.relative,
                  key: `${item.framework}-${item.relative}`,
                  files: fileListGroup[`${item.framework}-${item.relative}`]
                }))
                .map((group) => (
                  <div key={`${folder.path}-${group.key}`}>
                    <div className="flex flex-col h-full">
                      <h3 className={"font-bold"}>
                        {getLabel(group.framework)}
                      </h3>
                      <div className={"not-prose"}>
                        <div role="tablist" className="tabs tabs-lifted h-full">
                          {group.files.map((item, index) => (
                            <Fragment key={`${group.framework}-${item.value}`}>
                              <input
                                type="radio"
                                name={group.key}
                                role="tab"
                                className="tab"
                                aria-label={item.label}
                                defaultChecked={index === 0}
                              />
                              <div
                                role="tabpanel"
                                className={classNames(
                                  'tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto'
                                )}
                              >
                                <pre>
                                  {item.content}
                                </pre>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {folder.children && (
              <FolderStructureComponent
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

const Content = () => {
  const { currentDocInformation, contentDirList, fileListGroup, fileList } =
    useLoaderData<typeof loader>()
  if (!currentDocInformation) {
    return <div>Aside</div>
  }
  const [searchParams, setSearchParams] = useSearchParams()
  const selectFrameworkParams = useMemo(() => {
    return searchParams.getAll("frameworks")
  }, [searchParams])
  return (
    <div className={"flex flex-col"}>
      <div
        className={
          "flex px-6 lg:px-20 py-2 sticky top-0 z-20 w-full backdrop-blur border-b whitespace-nowrap overflow-x-auto gap-x-4"
        }
      >
        {currentDocInformation.frameworkList.map((framework) => (
          <button
            type={"button"}
            className={classNames(
              "border px-2 py-1 text-sm rounded-md text-base-content/60 cursor-pointer transition",
              "hover:bg-base-200",
              selectFrameworkParams.includes(framework.value) && "bg-base-200"
            )}
            key={framework.value}
            onClick={() => {
              setSearchParams((prev) => {
                if (selectFrameworkParams.includes(framework.value)) {
                  prev.delete("frameworks", framework.value)
                } else {
                  prev.append("frameworks", framework.value)
                }
                return prev
              })
            }}
          >
            {framework.label}
          </button>
        ))}
      </div>
      <main className={"prose prose-sm prose-h1:mt-6 prose-h2:mt-6 px-6 lg:px-20 py-2 max-w-none"}>
        <FolderStructureComponent
          folders={contentDirList}
          fileList={fileList}
          fileListGroup={fileListGroup}
        />
      </main>
    </div>
  )
}

export default Content
