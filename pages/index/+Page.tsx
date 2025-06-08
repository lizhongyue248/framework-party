import type { Content } from "@/types/index.js"
import { useData } from "vike-react/useData"
import { Counter } from "./Counter.js"

export default function Page() {
  const contentList = useData<Content[]>()
  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <div>
        {contentList.map((content, index) => (
          <pre key={`${content.name}-${index}`} className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        ))}
      </div>
    </>
  )
}
