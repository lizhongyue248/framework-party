import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PartyInfo } from "@/pages/index/+data"
import { Check, ChevronDown, ChevronUp, Star, Trophy, X, Zap } from "lucide-react"
import { useState } from "react"

interface FrameworkComparisonProps {
  data: PartyInfo
}

export function FrameworkComparison({ data }: FrameworkComparisonProps) {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(data.frameworkSupport.map((f) => f.name))
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  const toggleFramework = (frameworkName: string) => {
    setSelectedFrameworks((prev) => (prev.includes(frameworkName) ? prev.filter((name) => name !== frameworkName) : [...prev, frameworkName]))
  }

  const getFrameworkColor = (name: string) => {
    const colors: Record<string, string> = {
      React: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700",
      Vue: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700",
      Svelte: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-700",
      Lit: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700",
      Solid: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700",
      Qwik: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 border-pink-300 dark:border-pink-700",
      "Spring Boot": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700",
      Quarkus: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300 dark:border-red-700",
      Micronaut: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700"
    }
    return colors[name] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700"
  }

  const getFrameworkEmoji = (name: string) => {
    const emojis: Record<string, string> = {
      React: "⚛️",
      Vue: "💚",
      Svelte: "🔥",
      Lit: "💡",
      Solid: "🗿",
      Qwik: "⚡",
      "Spring Boot": "🍃",
      Quarkus: "🚀",
      Micronaut: "🔬"
    }
    return emojis[name] || "🚀"
  }

  // Show first 10 features or all based on state
  const displayedFeatures = showAllFeatures ? data.detailList : data.detailList.slice(0, 10)

  return (
    <>
      <div className="text-center mb-20">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-8 py-3 mb-8 shadow-xl">
          <Star className="h-5 w-5 animate-spin" />
          <span className="font-bold text-lg">MAIN EVENT</span>
          <Star className="h-5 w-5 animate-spin" />
        </div>
        <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">The Grand Comparison</h2>
        <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto font-medium">
          Witness the ultimate framework face-off! Compare features, capabilities, and implementations across all major frameworks in one spectacular table.
        </p>
      </div>
      <div className="space-y-16">
        <div className="flex flex-wrap justify-center gap-3">
          {data.frameworkSupport.map((framework) => (
            <Badge
              key={framework.name}
              variant={selectedFrameworks.includes(framework.name) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-300 hover:scale-110 text-lg px-4 py-2 border-2 ${
                selectedFrameworks.includes(framework.name) ? getFrameworkColor(framework.name) : "hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
              }`}
              onClick={() => toggleFramework(framework.name)}
            >
              <span className="mr-2">{getFrameworkEmoji(framework.name)}</span>
              {framework.name}
            </Badge>
          ))}
        </div>
        {/* Comparison Table */}
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-3 border-purple-200 dark:border-purple-700 overflow-hidden shadow-2xl pt-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white p-8">
            <CardTitle className="text-3xl font-black text-center flex items-center justify-center space-x-3">
              <Trophy className="h-8 w-8 animate-bounce" />
              <span>Feature Support Championship</span>
              <Trophy className="h-8 w-8 animate-bounce" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-3 border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
                    <th className="text-left p-4 font-black text-xl text-gray-900 dark:text-gray-100 min-w-[250px]">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        <span>Feature</span>
                      </div>
                    </th>
                    {data.frameworkSupport
                      .filter((framework) => selectedFrameworks.includes(framework.name))
                      .map((framework) => (
                        <th key={framework.name} className="text-center p-4 font-black min-w-[150px]">
                          <Badge className={`${getFrameworkColor(framework.name)} text-lg px-4 py-2 border-2`}>
                            <span className="mr-2">{getFrameworkEmoji(framework.name)}</span>
                            {framework.name}
                          </Badge>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {displayedFeatures.map((feature, index) => (
                    <tr
                      key={feature}
                      className={`border-b-2 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300 ${
                        index % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-800/30" : ""
                      }`}
                    >
                      <td className="p-4 font-bold text-lg text-gray-900 dark:text-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      </td>
                      {data.frameworkSupport
                        .filter((framework) => selectedFrameworks.includes(framework.name))
                        .map((framework) => (
                          <td key={framework.name} className="p-4 text-center">
                            {framework.detail[feature] ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-md hover:scale-110 transition-transform duration-200">
                                <Check className="h-4 w-4 text-white font-bold" />
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-md hover:scale-110 transition-transform duration-200">
                                <X className="h-4 w-4 text-white font-bold" />
                              </div>
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Show More/Less Button */}
            {data.detailList.length > 10 && (
              <div className="p-8 text-center border-t-2 border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20">
                <Button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {showAllFeatures ? (
                    <>
                      <ChevronUp className="h-5 w-5 mr-2" />
                      Show Less Features
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-5 w-5 mr-2" />
                      Show All {data.detailList.length} Features
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
