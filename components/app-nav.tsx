import LanguageSwitch from "@/components/language-switch"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Sparkles } from "lucide-react"
import React from "react"

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/20 dark:bg-black/20 backdrop-blur-lg border-b-2 border-purple-200/50 dark:border-purple-700/50 p-4 sm:p-6 transition-all duration-300">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 dark:text-purple-400 animate-spin" />
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full animate-ping" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse">
              <span className="hidden sm:inline">Framework Party</span>
              <span className="sm:hidden">Framework</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-4">
            <ThemeSwitch />
            <LanguageSwitch />
          </div>
          <div className="sm:hidden flex items-center space-x-2">
            <ThemeSwitch />
            <LanguageSwitch />
          </div>
          <a href="https://github.com/lizhongyue248/framework-party" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub repository">
            <Button variant="outline" size="icon" className="size-8">
              <SiGithub className="size-4" />
            </Button>
          </a>
        </div>
      </nav>
    </header>
  )
}
