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
    <div key={`page-${feature.feature}`} className={"flex flex-col gap-4"}>
      <h3 id={feature.feature} className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {feature.feature}
      </h3>
      <p>{feature.description}</p>
      {feature.item.map((detail) => (
        <DetailSection key={`detail-${detail.detail}-content`} detail={detail} feature={feature} filteredContent={filteredContent} />
      ))}
    </div>
  )
}
