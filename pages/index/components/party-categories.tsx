"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PartyInfo } from "@/pages/index/+data"

interface PartyCategoriesProps {
  categories: PartyInfo[]
  selectedCategory?: string
  onCategorySelect: (category: string) => void
}

export function PartyCategories({ categories, selectedCategory, onCategorySelect }: PartyCategoriesProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
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
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`text-4xl ${selectedCategory === category.name ? "animate-bounce" : "group-hover:animate-bounce"}`}>🎨</div>
                <div className="flex-1">
                  <h3
                    className={`text-xl font-black mb-2 ${selectedCategory === category.name ? "text-white" : "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"}`}
                  >
                    {category.name}
                  </h3>
                  <p className={`text-sm font-medium ${selectedCategory === category.name ? "text-white/90" : "text-gray-600 dark:text-gray-400"}`}>{category.description}</p>
                  <div className="mt-3 flex items-center space-x-2">
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
                  </div>
                </div>
                {selectedCategory === category.name && (
                  <div className="flex items-center">
                    <Badge className="bg-white/20 text-white border-white/30 animate-pulse">Active! 🎉</Badge>
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
