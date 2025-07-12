import { Link } from "@/components/link"
import { Button } from "@/components/ui/button"
import { getRepoName } from "@/lib/file"
import type { PartyInfo } from "@/types"
import type { I18nData } from "@/types/i18n"
import { Code, Sparkles } from "lucide-react"
import type React from "react"

interface WelcomeBannerProps {
  i18n: I18nData
  party?: PartyInfo
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ i18n, party }) => {
  const repoName = getRepoName(party?.repo ?? "")

  return (
    <section className="relative z-10 text-center py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 mb-8 sm:mb-12 border-2 border-purple-200 dark:border-purple-700 shadow-xl">
          <div className="hidden sm:flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
          <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800 dark:text-gray-200">🎊 {i18n.home.welcome} 🎊</span>
        </div>

        <div className="relative">
          <h1 className="font-black mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-pulse text-4xl sm:text-6xl md:text-7xl lg:text-8xl ">
            🎉 {i18n.home.title} 🎉
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium px-4 sm:px-0">{i18n.home.description}</p>

          <div className="flex gap-4 flex-row sm:gap-6 mt-6 sm:mt-8 justify-center items-center">
            <Link href={`/${party?.link}`}>
              <Button
                size="lg"
                className="max-w-sm bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 text-white rounded-full px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all"
              >
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                {party?.name} {i18n.common.base}
              </Button>
            </Link>
            <Button
              size="lg"
              className="max-w-sm bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 text-white rounded-full px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all"
              onClick={() => {
                document.getElementById("main")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Code className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              {i18n.home.action}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
