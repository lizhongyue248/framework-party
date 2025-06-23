import type { Framework } from "@/types"
import { DetailSection } from "./detail-section"

interface FeatureSectionProps {
  feature: {
    feature: string
    description: string
    item: { detail: string }[]
  }
  filteredContent: Framework[]
}

export const FeatureSection = ({ feature, filteredContent }: FeatureSectionProps) => {
  return (
    <div key={`page-${feature.feature}`} className={"flex flex-col gap-4 relative"}>
      <h3 id={feature.feature} className="group top-0 z-10 bg-[var(--background)] py-2 scroll-m-20 text-2xl font-semibold tracking-tight sticky">
        {feature.feature}
        <a
          tabIndex={-1}
          href={`#${feature.feature}`}
          className={"float-left -ml-6 transition-all duration-200 opacity-0 group-hover:opacity-100 w-4 pr-6"}
          aria-label={`Link to ${feature.feature}`}
        >
          #
        </a>
      </h3>
      <p>{feature.description}</p>
      {feature.item.map((detail) => (
        <DetailSection key={`detail-${detail.detail}-content`} detail={detail} feature={feature} filteredContent={filteredContent} />
      ))}
    </div>
  )
}
