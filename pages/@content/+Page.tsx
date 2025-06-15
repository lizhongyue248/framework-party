import { useStore } from "@/lib/store"
import type { ContentData } from "@/pages/@content/+data"
import { useMemo } from "react"
import { useData } from "vike-react/useData"
import "./page.css"
import { FeatureSection } from "@/pages/@content/component/feature-section"

export const Page = () => {
  const { currentContent, sidebar } = useData<ContentData>()
  const activeFrameworks = useStore((state) => state.activeFrameworks)

  const filteredContent = useMemo(() => {
    if (!currentContent) return []
    if (activeFrameworks.length === 0) return []
    return currentContent.framework.filter((fw) => activeFrameworks.includes(fw.name))
  }, [currentContent, activeFrameworks])

  if (!currentContent) {
    return <div className={"py-4 h-full"}>No Data</div>
  }

  return (
    <div className={"py-4 h-full flex flex-col gap-2"}>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{currentContent.name}</h2>
      <div>{currentContent.description}</div>
      {sidebar.data.map((feature) => (
        <FeatureSection key={`page-${feature.feature}`} feature={feature} filteredContent={filteredContent} />
      ))}
    </div>
  )
}
