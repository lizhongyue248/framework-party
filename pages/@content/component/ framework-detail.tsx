import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getFileName } from "@/lib/utils"
import type { File, Framework } from "@/types"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Copy } from "lucide-react"
import { toast } from "sonner"

interface FrameworkDetailProps {
  framework: Framework
  feature: { feature: string }
  detail: { detail: string }
  frameworkKey: string
  selectedFileIndex: number
  onFileSelect: (index: number) => void
}

export const FrameworkDetail = ({ framework, feature, detail, selectedFileIndex, onFileSelect }: FrameworkDetailProps) => {
  const currentFeature = framework.feature.find((f) => f.name === feature.feature)
  const currentDetail = currentFeature?.detail?.find((d) => d.name === detail.detail)
  console.log("detail", detail)
  return (
    <div className={"flex flex-col gap-4"}>
      <div className="text-lg font-semibold">{framework.name}</div>
      {!currentDetail ? (
        <div>No data available</div>
      ) : (
        <>
          <small className="text-sm leading-none font-medium">{currentDetail.description}</small>
          {currentDetail.file.length > 0 && (
            <CodeBlock files={currentDetail.file} selectedFileIndex={selectedFileIndex} onFileSelect={onFileSelect} repository={framework.repository} />
          )}
        </>
      )}
    </div>
  )
}

interface CodeBlockProps {
  files: File[]
  selectedFileIndex: number
  onFileSelect: (index: number) => void
  repository: string
}

const CodeBlock = ({ files, selectedFileIndex, onFileSelect, repository }: CodeBlockProps) => {
  const currentFile = files[selectedFileIndex]

  return (
    <div className="code-block overflow-auto rounded-md my-2 relative group">
      <div className={"absolute top-2 left-4 flex flex-row items-center gap-2"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="text-xs cursor-pointer opacity-50">
              {getFileName(currentFile.path)}
              {files.length > 1 && (
                <span className="mx-1 text-muted-foreground">
                  ({selectedFileIndex + 1}/{files.length})
                </span>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[8rem] p-1">
            {files.map((file, index) => (
              <DropdownMenuItem key={`file-${file.path}-${index}`} onClick={() => onFileSelect(index)} className="text-xs py-1 px-2">
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
              await navigator.clipboard.writeText(currentFile.code ?? "")
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
            const fileUrl = currentFile.path
            const repoUrl = repository.replace(/\.git$/, "")
            window.open(`${repoUrl}/blob/main/${fileUrl}`, "_blank")
          }}
        >
          <SiGithub className="size-3" />
        </Button>
      </div>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div dangerouslySetInnerHTML={{ __html: currentFile.content ?? "" }} />
    </div>
  )
}
