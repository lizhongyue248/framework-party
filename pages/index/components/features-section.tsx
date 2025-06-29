import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { I18nData } from "@/types/i18n"
import { Code, Rocket, Sparkles, Star, Users, Zap } from "lucide-react"
import type React from "react"

interface FeaturesSectionProps {
  i18n: I18nData
}

const icons = [
  <Code className="h-8 w-8" key="code" />,
  <Zap className="h-8 w-8" key="zap" />,
  <Users className="h-8 w-8" key="users" />,
  <Star className="h-8 w-8" key="star" />,
  <Rocket className="h-8 w-8" key="rocket" />,
  <Sparkles className="h-8 w-8" key="sparkles" />
]

const colors = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-red-500",
  "from-green-500 to-blue-500",
  "from-yellow-500 to-orange-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-purple-500"
]

const emojis = ["💻", "⚡", "🌍", "🔄", "🚀", "🎉"]

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ i18n }) => {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{i18n.home.why.title}</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">{i18n.home.why.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {i18n.home.why.question.map((question, index: number) => {
            const color = colors[index % colors.length]
            return (
              <Card
                key={question.title}
                className="bg-white/90 dark:bg-black/40 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 150}ms`, paddingTop: "0px" }}
              >
                <div className={`h-2 bg-gradient-to-r ${color}`} />
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${color} text-white group-hover:animate-pulse`}>{icons[index % colors.length]}</div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{question.title}</span>
                    <span className="text-2xl group-hover:animate-bounce">{emojis[index % colors.length]}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{question.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
