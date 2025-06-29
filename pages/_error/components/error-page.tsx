import { AppHeader } from "@/components/app-nav"
import { ConfettiEffect } from "@/components/effect/confetti-effect"
import { PartyEffects } from "@/components/effect/party-effects"
import LanguageSwitch from "@/components/language-switch"
import { Link } from "@/components/link"
import { ThemeSwitch } from "@/components/theme-switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ErrorData } from "@/pages/_error/+data"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { AlertTriangle, ArrowLeft, Code, ExternalLink, Github, Globe, Home, Moon, PartyPopper, RefreshCw, Sparkles, Sun, Zap } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useData } from "vike-react/useData"

interface ErrorPageProps {
  errorCode?: "404" | "500"
  title?: string
  description?: string
}
export default function ErrorPage({ errorCode = "404", title, description }: ErrorPageProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const { i18n, links }: ErrorData = useData()
  const errorData = i18n.common.error
  const currentError = i18n.common.error[errorCode]
  const currentTitle = title || currentError.title
  const currentDescription = description || currentError.description

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 1000)
    const timer2 = setTimeout(() => setShowConfetti(false), 4000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = "/"
    }
  }

  const triggerCelebration = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const styles = [
    { icon: <Home className={"size-8"} />, color: "from-blue-500 to-purple-600" },
    { icon: <Code className={"size-8"} />, color: "from-purple-500 to-pink-600" },
    { icon: <PartyPopper className={"size-8"} />, color: "from-pink-500 to-red-500" },
    { icon: <Zap className={"size-8"} />, color: "from-orange-500 to-red-600" }
  ]

  const partyPages = [
    { name: "Homepage", path: "/", icon: Home, color: "from-blue-500 to-purple-600" },
    { name: "Documentation", path: "/docs", icon: Code, color: "from-purple-500 to-pink-600" },
    { name: "Frontend Party", path: "/#frontend", icon: PartyPopper, color: "from-pink-500 to-red-500" },
    { name: "Java Web Party", path: "/#java", icon: Zap, color: "from-orange-500 to-red-600" }
  ]

  return (
    <div className={"min-h-screen transition-all duration-700"}>
      <PartyEffects />
      {showConfetti && <ConfettiEffect />}

      {/* Header */}
      <AppHeader />
      {/* Main Error Content */}
      <main className="relative z-10 flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Error Status */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-8 py-3 mb-8 border-2 border-red-200 dark:border-red-700 shadow-xl">
              <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
              <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-600 text-lg px-4 py-2">
                {errorData.errorCode}: {errorCode}
              </Badge>
              <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">{currentTitle}</h1>

            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium mb-6">{currentDescription}</p>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{currentError.suggestion}</p>
          </div>

          {/* Navigation Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Link
              href={"/"}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-auto"
            >
              <div className="text-center">
                <div>{errorData.navigation.backHome}</div>
                <div className="text-sm opacity-80">Return to main page</div>
              </div>
            </Link>

            <Button
              onClick={handleGoBack}
              variant="outline"
              className="rounded-xl px-6 py-4 text-lg font-bold border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-white/40 dark:bg-black/40 backdrop-blur-sm border-purple-300 dark:border-purple-600 hover:scale-105 transition-all duration-300 h-auto"
            >
              <div className="text-center">
                <div>{errorData.navigation.goBack}</div>
                <div className="text-sm opacity-60">Previous page</div>
              </div>
            </Button>
          </div>

          {/* Quick Party Links */}
          <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-sm border-3 border-purple-200 dark:border-purple-700 shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-black mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">🎉 {errorData.quickLinks}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {links.map((page, index) => (
                  <Card
                    key={page.name}
                    className="group hover:shadow-xl p-0 transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500"
                    onClick={() => {
                      window.location.href = page.link
                    }}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${styles[index % 4].color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {styles[index % 4].icon}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {page.name}
                      </h3>
                      <div className="text-sm opacity-80">{page.description}</div>
                      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="h-4 w-4 mx-auto text-purple-600 dark:text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/90 backdrop-blur-sm text-white py-12 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
            <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Framework Party</span>
            <Sparkles className="h-6 w-6 text-pink-400 animate-pulse" />
          </div>
          <p className="text-gray-400 mb-6">Even our errors are part of the celebration! 🎊</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="hover:text-purple-400 transition-colors">
              Home
            </a>
            <a href="https://github.com/framework-party" className="hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
