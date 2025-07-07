import { Link } from "@/components/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getFrameworkConfig } from "@/lib/utils"
import type { PartyInfo } from "@/types"
import type { I18nData } from "@/types/i18n"
import type React from "react"

interface FrameworkDisplayProps {
  i18n: I18nData
  currentParty: PartyInfo | undefined
}

export const FrameworkDisplay: React.FC<FrameworkDisplayProps> = ({ i18n, currentParty }) => {
  if (!currentParty) return null

  return (
    <Card className="bg-white/90 dark:bg-black/40 backdrop-blur-sm border-3 border-purple-200 dark:border-purple-700 shadow-2xl">
      <CardHeader className="text-center p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          <span className="mr-2 sm:mr-3">🎨</span>
          {currentParty.name} Party
        </CardTitle>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">{currentParty.description}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
          {currentParty.frameworkSupport.map((framework, index: number) => {
            const config = getFrameworkConfig(framework.name)
            return (
              <Card
                key={framework.name}
                className={`group p-0 ${config.bgColor} backdrop-blur-sm border-3 border-transparent hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer transform hover:-translate-y-2`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards"
                }}
              >
                <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                  <img
                    className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-4xl mb-2 sm:mb-4 group-hover:animate-bounce group-hover:scale-125 transition-all duration-300"
                    src={framework.logo}
                    alt={framework.name}
                  />
                  <div
                    className={`text-sm sm:text-base md:text-lg font-black bg-gradient-to-r ${config.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                  >
                    {framework.name}
                  </div>
                  <div className="mt-2 sm:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`h-1 bg-gradient-to-r ${config.color} rounded-full`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Link
          href={`/${currentParty.link}`}
          className="w-full text-center max-w-sm bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 text-white rounded-full px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse"
        >
          {i18n.home.action}
        </Link>
      </CardContent>
    </Card>
  )
}
