import { useLoaderData } from "@remix-run/react"
import type { loader } from "~/routes/_index.($doctype)/route"

const Content = () => {
  const { currentDocInformation } = useLoaderData<typeof loader>()
  if (!currentDocInformation) {
    return <div>Aside</div>
  }
  return (
    <div>
      <div
        className={
          "flex px-6 lg:px-20 py-2 sticky top-0 z-20 w-full backdrop-blur border-b whitespace-nowrap overflow-x-auto"
        }
      >
        {currentDocInformation.frameworkList.map((framework) => (
          <div key={framework.value}>{framework.label}</div>
        ))}
      </div>
    </div>
  )
}

export default Content
