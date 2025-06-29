import { Button } from "@/components/ui/button"
import type { I18nData } from "@/types/i18n"
import { Code } from "lucide-react"
import type React from "react"

interface WelcomeBannerProps {
  i18n: I18nData
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ i18n }) => {
  return (
    <section className="relative z-10 text-center py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center space-x-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full px-8 py-3 mb-12 border-2 border-purple-200 dark:border-purple-700 shadow-xl">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
          <span className="text-lg font-bold text-gray-800 dark:text-gray-200">🎊 {i18n.home.welcome} 🎊</span>
        </div>

        <div className="relative">
          <h1 className="font-black mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-pulse text-9xl">
            🎉 {i18n.home.title} 🎉
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">{i18n.home.description}</p>

          <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center items-center">
            <Button
              size="lg"
              className="w-full max-w-sm bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 text-white rounded-full px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse"
              onClick={() => {
                document.getElementById("main")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Code className="h-6 w-6 mr-3" />
              {i18n.home.action}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
