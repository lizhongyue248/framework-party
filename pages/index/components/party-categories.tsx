import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PartyInfo } from "@/types"

interface PartyCategoriesProps {
  categories: PartyInfo[]
  selectedCategory?: string
  onCategorySelect: (category: string) => void
}

export function PartyCategories({ categories, selectedCategory, onCategorySelect }: PartyCategoriesProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        {Object.entries(categories).map(([key, category]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-3 ${
              selectedCategory === category.name
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-2xl"
                : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500"
            }`}
            onClick={() => onCategorySelect(category.name)}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                <div className={`text-2xl sm:text-3xl md:text-4xl flex-shrink-0 ${selectedCategory === category.name ? "animate-bounce" : "group-hover:animate-bounce"}`}>🎨</div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg sm:text-xl font-black mb-1 sm:mb-2 ${selectedCategory === category.name ? "text-white" : "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"}`}
                  >
                    {category.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 line-clamp-2 ${selectedCategory === category.name ? "text-white/90" : "text-gray-600 dark:text-gray-400"}`}
                  >
                    {category.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        selectedCategory === category.name ? "border-white/30 text-white/80" : "border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400"
                      }`}
                    >
                      {category.frameworkSupport.length} frameworks
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        selectedCategory === category.name ? "border-white/30 text-white/80" : "border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400"
                      }`}
                    >
                      {category.detailList.length} features
                    </Badge>
                    {selectedCategory === category.name && <Badge className="bg-white/20 text-white border-white/30 animate-pulse hidden sm:inline-flex">Active! 🎉</Badge>}
                  </div>
                </div>
                {selectedCategory === category.name && (
                  <div className="flex items-center sm:hidden">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
