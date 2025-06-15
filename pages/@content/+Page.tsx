import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useStore } from "@/lib/store"
import { getFileName } from "@/lib/utils"
import type { ContentData } from "@/pages/@content/+data"
import { ChevronDown, Copy } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { useData } from "vike-react/useData"
import "./page.css"
import { SiGithub } from "@icons-pack/react-simple-icons"

export const Page = () => {
  const { currentContent, sidebar } = useData<ContentData>()
  const activeFrameworks = useStore((state) => state.activeFrameworks)
  const filteredContent = useMemo(() => {
    if (!currentContent) return []
    if (activeFrameworks.length === 0) return []
    return currentContent.framework.filter((fw) => activeFrameworks.includes(fw.name))
  }, [currentContent, activeFrameworks])

  const [selectedFileIndices, setSelectedFileIndices] = useState<Record<string, number>>({})

  if (!currentContent) {
    return <div className={"py-4 h-full"}>No Data</div>
  }
  return (
    <div className={"py-4 h-full flex flex-col gap-2"}>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{currentContent.name}</h2>
      <div>{currentContent.description}</div>
      {sidebar.data.map((feature) => (
        <div key={`page-${feature.feature}`} className={"flex flex-col gap-4"}>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{feature.feature}</h3>
          <p>{feature.description}</p>
          {feature.item.map((detail) => (
            <div key={`detail-${detail.detail}-content`} className={"flex flex-col gap-4"}>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{detail.detail}</h4>
              <div className={"grid gap-4 grid-cols-2"}>
                {filteredContent.map((framework) => {
                  const currentFeature = framework.feature.find((f) => f.name === feature.feature)
                  const currentDetail = currentFeature?.detail?.find((d) => d.name === detail.detail)
                  const frameworkKey = `${framework.name}-${feature.feature}-${detail.detail}`
                  const selectedFileIndex = selectedFileIndices[frameworkKey] || 0

                  return (
                    <div key={`framework-${framework.name}-data`} className={"flex flex-col gap-4"}>
                      <div className="text-lg font-semibold">{framework.name}</div>
                      {!currentDetail ? (
                        <div>No data available</div>
                      ) : (
                        <>
                          <small className="text-sm leading-none font-medium">{currentDetail.description}</small>
                          {currentDetail.file.length > 0 && (
                            <div className="code-block overflow-auto rounded-md my-2 relative group">
                              <div className={"absolute top-2 left-4 flex flex-row items-center gap-2"}>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <div className="text-xs cursor-pointer opacity-50">
                                      {getFileName(currentDetail.file[selectedFileIndex].path)}
                                      {currentDetail.file.length > 1 && (
                                        <span className="mx-1 text-muted-foreground">
                                          ({selectedFileIndex + 1}/{currentDetail.file.length})
                                        </span>
                                      )}
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="min-w-[8rem] p-1">
                                    {currentDetail.file.map((file, index) => (
                                      <DropdownMenuItem
                                        key={`file-${file.path}-${index}`}
                                        onClick={() => {
                                          setSelectedFileIndices((prev) => ({
                                            ...prev,
                                            [frameworkKey]: index
                                          }))
                                        }}
                                        className="text-xs py-1 px-2"
                                      >
                                        {getFileName(file.path)}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className={"absolute top-2 right-4 flex flex-row items-center gap-3"}>
                                <Button
                                  variant={"ghost"}
                                  size={"icon"}
                                  className="h-2 w-2 opacity-30"
                                  onClick={async () => {
                                    try {
                                      await navigator.clipboard.writeText(currentDetail.file[selectedFileIndex].code ?? "")
                                      toast.success("Copied to clipboard success!")
                                    } catch (e) {
                                      toast.error(`Copied to clipboard failed! ${e}`)
                                    }
                                  }}
                                >
                                  <Copy className="size-3" />
                                </Button>
                                <Button
                                  variant={"ghost"}
                                  size={"icon"}
                                  className="h-2 w-2 opacity-30"
                                  onClick={() => {
                                    const fileUrl = currentDetail.file[selectedFileIndex].path
                                    const repoUrl = currentContent.repository.replace(/\.git$/, "")
                                    window.open(`${repoUrl}/blob/main/${fileUrl}`, "_blank")
                                  }}
                                >
                                  <SiGithub className="size-3" />
                                </Button>
                              </div>
                              {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                              <div dangerouslySetInnerHTML={{ __html: currentDetail.file[selectedFileIndex].content ?? "" }} />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
