import { useLoaderData, useSearchParams } from "@remix-run/react"
import classNames from "classnames"
import type React from "react"
import { useMemo } from "react"
import type { loader } from "~/routes/_index.($doctype)/route"
import FolderContent from "~/components/FolderContent"
import Spring from "~/components/icons/Spring"

const FrameworkIcon = [
  {
    name: "spring",
    icon: <Spring />
  }
]

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
        {currentDocInformation.frameworkList.map((framework) => {
          const currentIcon = FrameworkIcon.find(
            (item) =>
              item.name.toLowerCase().toLowerCase() ===
              framework.label.toLowerCase().replace(" ", "")
          )
          return (
            <button
              type={"button"}
              className={classNames(
                "border px-2 py-1 text-sm rounded-md text-base-content/60 cursor-pointer transition dark:border-gray-600",
                "flex flex-row gap-x-2 items-center",
                "hover:bg-base-300",
                selectFrameworkParams.includes(framework.value) &&
                  "bg-base-200 text-black dark:text-gray-200"
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
              {currentIcon && <div className={"w-4"}>{currentIcon.icon}</div>}
              {framework.label}
            </button>
          )
        })}
      </div>
      <main
        className={
          "prose prose-sm prose-h1:mt-6 prose-h2:mt-6 px-6 lg:px-20 py-2 max-w-none"
        }
      >
        <FolderContent
          folders={contentDirList}
          fileList={fileList}
          fileListGroup={fileListGroup}
        />
      </main>
    </div>
  )
}

export default Content
