import { ConfettiEffect } from "@/components/effect/confetti-effect"
import { FireworksEffect } from "@/components/effect/fireworks-effect"
import { FrameworkComparison } from "@/components/effect/framework-comparison"
import { PartyEffects } from "@/components/effect/party-effects"
import { Link } from "@/components/link"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import type { HomePageData } from "@/pages/index/+data"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Code, ExternalLink, Moon, Rocket, Sparkles, Star, Sun, Users, Zap } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useData } from "vike-react/useData"
import { PartyCategories } from "./component/party-categories"

const Page = () => {
  const { partyList, i18n }: HomePageData = useData()
  const [showFireworks, setShowFireworks] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Frontend")
  const currentParty = useMemo(() => partyList.find((party) => party.name === selectedCategory), [selectedCategory])
  const { theme } = useStore()
  const isDark = useMemo(() => theme === "dark", [theme])
  useEffect(() => {
    const timer1 = setTimeout(() => setShowConfetti(true), 1000)
    const timer2 = setTimeout(() => setShowFireworks(true), 2000)
    const timer3 = setTimeout(() => setShowConfetti(false), 6000)
    const timer4 = setTimeout(() => setShowFireworks(false), 8000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])
  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? "dark bg-black" : "bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100"}`}>
      <PartyEffects />
      {showConfetti && <ConfettiEffect />}
      {showFireworks && <FireworksEffect />}
      <header className="relative z-20 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-purple-600 dark:text-purple-400 animate-spin" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse">Framework Party</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitch />
            <Button variant="outline" className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 hover:scale-105 transition-all duration-300">
              <SiGithub className="h-4 w-4 mr-2" />
              Open Source
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative z-10 text-center py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-8 py-3 mb-12 border-2 border-purple-200 dark:border-purple-700 shadow-xl">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">🎊 Welcome to the Ultimate Framework Showdown! 🎊</span>
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
              >
                <Code className="h-6 w-6 mr-3" />
                {i18n.home.action}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "6+", label: "Frameworks", icon: "⚛️", color: "from-blue-500 to-purple-600" },
              { number: "22+", label: "Features", icon: "🔧", color: "from-purple-500 to-pink-600" },
              { number: "∞", label: "Possibilities", icon: "🚀", color: "from-pink-500 to-red-500" },
              { number: "100%", label: "Open Source", icon: "💝", color: "from-green-500 to-blue-500" }
            ].map((stat, index) => (
              <Card
                key={stat.label}
                className="text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-500 hover:scale-110 group cursor-pointer"
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

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-8 py-3 mb-8 shadow-xl">
              <span className="text-2xl animate-spin">🎪</span>
              <span className="font-bold text-lg">PARTY GUESTS</span>
              <span className="text-2xl animate-spin">🎪</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Meet the Party</h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300 font-medium">Choose your party and start comparing! 🎉</p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Party Categories */}
            <div className="space-y-6">
              <PartyCategories categories={partyList} selectedCategory={selectedCategory} onCategorySelect={(key) => setSelectedCategory(key)} />
            </div>

            {/* Right Column - Framework Logos for Selected Category */}
            <div className="space-y-6">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-3 border-purple-200 dark:border-purple-700 shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    <span className="mr-3">🎨</span>
                    {currentParty?.name} Frameworks
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">{currentParty?.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {currentParty?.frameworkSupport.map((framework, index) => {
                      const getFrameworkConfig = (name: string) => {
                        const configs: Record<string, { emoji: string; color: string; bgColor: string }> = {
                          React: {
                            emoji: "⚛️",
                            color: "from-blue-400 to-blue-600",
                            bgColor: "bg-blue-50 dark:bg-blue-900/20"
                          },
                          Vue: {
                            emoji: "💚",
                            color: "from-green-400 to-green-600",
                            bgColor: "bg-green-50 dark:bg-green-900/20"
                          },
                          Svelte: {
                            emoji: "🔥",
                            color: "from-orange-400 to-red-500",
                            bgColor: "bg-orange-50 dark:bg-orange-900/20"
                          },
                          Lit: {
                            emoji: "💡",
                            color: "from-yellow-400 to-orange-500",
                            bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
                          },
                          Solid: {
                            emoji: "🗿",
                            color: "from-blue-500 to-purple-600",
                            bgColor: "bg-purple-50 dark:bg-purple-900/20"
                          },
                          Qwik: {
                            emoji: "⚡",
                            color: "from-purple-400 to-pink-500",
                            bgColor: "bg-pink-50 dark:bg-pink-900/20"
                          },
                          "Spring Boot": {
                            emoji: "🍃",
                            color: "from-green-400 to-green-600",
                            bgColor: "bg-green-50 dark:bg-green-900/20"
                          },
                          Quarkus: {
                            emoji: "🚀",
                            color: "from-red-400 to-red-600",
                            bgColor: "bg-red-50 dark:bg-red-900/20"
                          },
                          Micronaut: {
                            emoji: "🔬",
                            color: "from-blue-400 to-blue-600",
                            bgColor: "bg-blue-50 dark:bg-blue-900/20"
                          },
                          "React Native": {
                            emoji: "📱",
                            color: "from-blue-400 to-purple-600",
                            bgColor: "bg-blue-50 dark:bg-blue-900/20"
                          },
                          Flutter: {
                            emoji: "🦋",
                            color: "from-blue-400 to-cyan-500",
                            bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
                          },
                          Ionic: {
                            emoji: "⚡",
                            color: "from-blue-500 to-indigo-600",
                            bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
                          }
                        }
                        return (
                          configs[name] || {
                            emoji: "🚀",
                            color: "from-gray-400 to-gray-600",
                            bgColor: "bg-gray-50 dark:bg-gray-900/20"
                          }
                        )
                      }

                      const config = getFrameworkConfig(framework.name)

                      return (
                        <Card
                          key={framework.name}
                          className={`group ${config.bgColor} backdrop-blur-sm border-3 border-transparent hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer transform hover:-translate-y-2`}
                          style={{
                            animationDelay: `${index * 200}ms`,
                            animation: "fadeInUp 0.8s ease-out forwards"
                          }}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="text-4xl mb-4 group-hover:animate-bounce group-hover:scale-125 transition-all duration-300">{config.emoji}</div>
                            <div
                              className={`text-lg font-black bg-gradient-to-r ${config.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                            >
                              {framework.name}
                            </div>
                            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className={`h-1 bg-gradient-to-r ${config.color} rounded-full`} />
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Comparison - More Prominent */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">{currentParty && <FrameworkComparison data={currentParty} />}</div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Why Join the Party?</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              Making framework comparison fun, interactive, and insightful for developers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Code className="h-8 w-8" />,
                title: "Side-by-Side Code",
                description: "Compare how different frameworks implement the same features with real, executable code examples.",
                color: "from-purple-500 to-blue-500",
                emoji: "💻"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Interactive Examples",
                description: "Run and modify code examples directly in your browser to see how they work in real-time.",
                color: "from-pink-500 to-red-500",
                emoji: "⚡"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community Driven",
                description: "Open source and community-driven with contributions from passionate developers worldwide.",
                color: "from-green-500 to-blue-500",
                emoji: "🌍"
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Always Updated",
                description: "Stay current with the latest framework features and best practices as they evolve.",
                color: "from-yellow-500 to-orange-500",
                emoji: "🔄"
              },
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Performance Focused",
                description: "Compare not just syntax but also performance metrics and bundle sizes across frameworks.",
                color: "from-indigo-500 to-purple-500",
                emoji: "🚀"
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Fun Learning",
                description: "Learn framework differences in an engaging, party-themed environment that makes coding fun!",
                color: "from-pink-500 to-purple-500",
                emoji: "🎉"
              }
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 150}ms`, paddingTop: "0px" }}
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${feature.color} text-white group-hover:animate-pulse`}>{feature.icon}</div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{feature.title}</span>
                    <span className="text-2xl group-hover:animate-bounce">{feature.emoji}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8">Ready to Party? 🎊</h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                Join thousands of developers who are already comparing frameworks the fun way. Start your coding celebration today!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
                >
                  <Rocket className="h-6 w-6 mr-3" />
                  Start Comparing Now!
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 rounded-full px-12 py-4 text-xl font-bold hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <SiGithub className="h-6 w-6 mr-3" />
                  Contribute on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="relative z-10 bg-black text-white py-16 px-6 mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
              <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Framework Party</span>
              <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
            </div>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Making framework comparison fun and accessible for everyone. Join the celebration of code!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-purple-400">🚀 Quick Start</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-pink-400">🌟 Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contribute
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-orange-400">🎉 Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 Framework Party. Made with ❤️ by the developer community.
              <span className="block mt-2">Open source and free forever! 🎊</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Page
