import { useStore } from "@/lib/store"
import type { ContentData } from "@/pages/@content/+data"
import React, { useMemo } from "react"
import { useData } from "vike-react/useData"
import "./page.css"
import { FeatureSection } from "@/pages/@content/components/feature-section"
import { SiGithub } from "@icons-pack/react-simple-icons"

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
      <h2 className="scroll-m-20 bg-transparent border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {currentContent.name}
        <a href={currentContent.repository} target={"_blank"} rel="noreferrer">
          <SiGithub className={"inline ml-3"} />
        </a>
      </h2>
      <div>{currentContent.description}</div>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div className={"mt-4"} dangerouslySetInnerHTML={{ __html: currentContent.readmeContent ?? "" }} />
      {sidebar.data.map((feature) => (
        <FeatureSection key={`page-${feature.feature}`} feature={feature} filteredContent={filteredContent} />
      ))}
    </div>
  )
}
