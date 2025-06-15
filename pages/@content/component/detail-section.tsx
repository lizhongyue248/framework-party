import { FrameworkDetail } from "@/pages/@content/component/ framework-detail"
import type { Framework } from "@/types"
import { useState } from "react"

interface DetailSectionProps {
  detail: { detail: string }
  feature: { feature: string }
  filteredContent: Framework[]
}

export const DetailSection = ({ detail, feature, filteredContent }: DetailSectionProps) => {
  const [selectedFileIndices, setSelectedFileIndices] = useState<Record<string, number>>({})

  return (
    <div className={"flex flex-col gap-4"}>
      <h4 id={detail.detail} className="scroll-m-20 text-xl font-semibold tracking-tight">
        {detail.detail}
      </h4>
      <div className={"grid gap-4 grid-cols-2"}>
        {filteredContent.map((framework) => {
          const frameworkKey = `${framework.name}-${feature.feature}-${detail.detail}`
          const selectedFileIndex = selectedFileIndices[frameworkKey] || 0

          return (
            <FrameworkDetail
              key={`framework-${framework.name}-data`}
              framework={framework}
              feature={feature}
              detail={detail}
              frameworkKey={frameworkKey}
              selectedFileIndex={selectedFileIndex}
              onFileSelect={(index) => {
                setSelectedFileIndices((prev) => ({
                  ...prev,
                  [frameworkKey]: index
                }))
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
