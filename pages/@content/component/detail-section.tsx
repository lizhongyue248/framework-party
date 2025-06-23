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
    <div className={"flex flex-col gap-4 relative"}>
      <h4 id={detail.detail} className="group top-0 z-10 bg-[var(--background)] py-2 scroll-m-20 text-xl font-semibold tracking-tight sticky">
        {detail.detail}
        <a
          tabIndex={-1}
          href={`#${detail.detail}`}
          className={"float-left -ml-6 transition-all duration-200 opacity-0 group-hover:opacity-100 w-4 pr-6"}
          aria-label={`Link to ${detail.detail}`}
        >
          #
        </a>
      </h4>
      <div className={"grid gap-4 grid-cols-1 lg:grid-cols-2"}>
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
