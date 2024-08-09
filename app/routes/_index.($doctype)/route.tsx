import Header from "~/routes/_index.($doctype)/header"
import Aside from "~/routes/_index.($doctype)/aside"
import * as path from "node:path"
import * as fs from "node:fs"
import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import { type Category, getDirectoryStructure, getLabel } from '~/utils'
import Content from '~/routes/_index.($doctype)/content'

export interface Framework {
  label: string
  value: string
  path: string
}

export interface Doctype extends Framework{
}

export interface DocInformation {
  path: string
  frameworkList: Framework[]
  categoryList: Category[]
}

const getCurrentDoctypeInformation = (currentDoctype: Doctype): DocInformation => {
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const contentDir = path.join(process.cwd(), "content")
  const doctypeList: Doctype[] = fs.readdirSync(contentDir).map((item) => ({
    label: item.substring(item.indexOf("-") + 1),
    value: item,
    path: path.join(contentDir, item)
  }))
  let currentDocInformation: DocInformation | null = null
  if (params.doctype) {
    const currentDoctype = doctypeList.find(
      (item) => item.value === params.doctype
    )
    if (currentDoctype) {
      currentDocInformation = getCurrentDoctypeInformation(currentDoctype)
    } else {
      return redirect("/")
    }
  }
  return {
    doctype: params.doctype,
    doctypeList,
    currentDocInformation
  }
}

const App = () => {
  return (
    <div className={"flex flex-col h-screen"}>
      <Header />
      <div className={"flex flex-1 flex-row"}>
        <Aside />
        <div className={"w-full h-full"}>
          <Content />
        </div>
      </div>
    </div>
  )
}
export default App
