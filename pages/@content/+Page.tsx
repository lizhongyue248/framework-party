import { useStore } from "@/lib/store"
import { getFileName } from "@/lib/utils"
import type { ContentData } from "@/pages/@content/+data"
import { useMemo } from "react"
import { useData } from "vike-react/useData"

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
    <div className={"py-4 h-full border-t flex flex-col gap-2"}>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{currentContent.name}</h2>
      <div>{currentContent.description}</div>
      {sidebar.data.map((feature) => {
        return (
          <div key={`page-${feature.feature}`} className={"flex flex-col gap-4"}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{feature.feature}</h3>
            <p>{feature.description}</p>
            {feature.item.map((detail) => {
              return (
                <div key={`detail-${detail.detail}-content`} className={"flex flex-col gap-4"}>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{detail.detail}</h4>
                  <div className={"grid gap-4 grid-cols-2"}>
                    {filteredContent.map((framework) => {
                      const currentFeature = framework.feature.find((f) => f.name === feature.feature)
                      const currentDetail = currentFeature?.detail?.find((d) => d.name === detail.detail)
                      return (
                        <div key={`framework-${framework.name}-data`} className={"flex flex-col gap-4"}>
                          <div className="text-lg font-semibold">{framework.name}</div>
                          {!currentDetail ? (
                            <div>No data available</div>
                          ) : (
                            <>
                              <small className="text-sm leading-none font-medium">{currentDetail.description}</small>
                              {currentDetail.file.map((file) => (
                                <div key={`file-${file.path}`}>
                                  <div className={"text-sm "}>{getFileName(file.path)}</div>
                                  {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                                  <div className="code-block overflow-auto rounded-md my-2" dangerouslySetInnerHTML={{ __html: file.content ?? "" }} />
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
