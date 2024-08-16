import Header from "~/routes/_index.($doctype)/header"
import Aside from "~/routes/_index.($doctype)/aside"
import * as path from "node:path"
import * as fs from "node:fs"
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect
} from "@remix-run/node"
import {
  type Category,
  type FileStructure,
  type FolderStructure,
  getDirectoryStructure,
  getLabel,
  processPaths,
  readDirectoryRecursive
} from "~/utils"
import Content from "~/routes/_index.($doctype)/content"
import _ from "lodash"
import { applicationConfig } from "~/server/cookies.server"

export interface Framework {
  label: string
  value: string
  path: string
}

export interface Doctype extends Framework {}

export interface DocInformation {
  path: string
  frameworkList: Framework[]
  categoryList: Category[]
}

const getCurrentDoctypeInformation = (
  currentDoctype: Doctype
): DocInformation => {
  const frameworkList = fs
    .readdirSync(currentDoctype.path)
    .map((frameworkDir) => ({
      label: getLabel(frameworkDir),
      value: frameworkDir,
      path: path.join(currentDoctype.path, frameworkDir)
    }))
  let categoryList: Category[] = []
  if (frameworkList.length > 0) {
    categoryList = getDirectoryStructure(frameworkList[0].path)
  }
  return {
    path: currentDoctype.path,
    frameworkList,
    categoryList
  }
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const contentDir = path.join(process.cwd(), "content")
  const doctypeList: Doctype[] = fs.readdirSync(contentDir).map((item) => ({
    label: item.substring(item.indexOf("-") + 1),
    value: item,
    path: path.join(contentDir, item)
  }))
  let currentDocInformation: DocInformation | null = null
  let contentDirList: FolderStructure[] = []
  let fileList: FileStructure[] = []
  let fileListGroup: { [key: string]: FileStructure[] } = {}
  if (params.doctype) {
    const currentDoctype = doctypeList.find(
      (item) => item.value === params.doctype
    )
    if (currentDoctype) {
      currentDocInformation = getCurrentDoctypeInformation(currentDoctype)
      const frameworksParam = new URL(request.url).searchParams.getAll(
        "frameworks"
      )
      const selectFrameworks = currentDocInformation.frameworkList.filter(
        (framework) => frameworksParam.includes(framework.value)
      )
      const frameworkDir = selectFrameworks.map((framework) =>
        readDirectoryRecursive(framework.path, currentDoctype.path)
      )
      contentDirList = frameworkDir[0] ?? []
      fileList = await processPaths(
        selectFrameworks.map((dir) => dir.path),
        currentDoctype.path
      )
      fileListGroup = _.groupBy(
        fileList,
        (item) => `${item.framework}-${item.relative}`
      )
    } else {
      return redirect("/")
    }
  }

  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await applicationConfig.parse(cookieHeader)) || {}

  return {
    doctype: params.doctype,
    doctypeList,
    currentDocInformation,
    contentDirList,
    fileList,
    fileListGroup,
    dark: cookie.dark
  }
}

const App = () => {
  return (
    <div className={"flex flex-col h-screen w-full"}>
      <Header />
      <div
        className={"flex flex-1 flex-row"}
        style={{ height: "calc(100% - 64px)" }}
      >
        <Aside />
        <div
          className={"w-full h-full overflow-auto pb-6 scroll-smooth snap-y "}
        >
          <Content />
        </div>
      </div>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await applicationConfig.parse(cookieHeader)) || {}
  cookie.dark = !cookie.dark
  return new Response(null, {
    headers: { "Set-Cookie": await applicationConfig.serialize(cookie) },
    status: 204
  })
}

export const shouldRevalidate = () => {
  return true
}

export default App
