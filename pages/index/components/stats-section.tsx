import { Card, CardContent } from "@/components/ui/card"
import type { I18nData } from "@/types/i18n"
import type React from "react"

interface StatsData {
  number: string | number
  label: string
  icon: string
  color: string
}

interface StatsSectionProps {
  i18n: I18nData
  framersCount: number
  featureDetailCount: number
}

export const StatsSection: React.FC<StatsSectionProps> = ({ i18n, framersCount, featureDetailCount }) => {
  const stats: StatsData[] = [
    { number: framersCount, label: i18n.home.summary.frameworks, icon: "⚛️", color: "from-blue-500 to-purple-600" },
    { number: featureDetailCount, label: i18n.home.summary.features, icon: "🔧", color: "from-purple-500 to-pink-600" },
    { number: "∞", label: i18n.home.summary.possibilities, icon: "🚀", color: "from-pink-500 to-red-500" },
    { number: "100%", label: i18n.home.summary.openSource, icon: "💝", color: "from-green-500 to-blue-500" }
  ]

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="text-center bg-white/90 dark:bg-black/40 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-500 hover:scale-110 group cursor-pointer"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
                <div className={`text-5xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:animate-pulse`}>{stat.number}</div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-lg">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
