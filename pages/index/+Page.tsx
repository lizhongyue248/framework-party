import { AppHeader } from "@/components/app-nav"
import { ConfettiEffect } from "@/components/effect/confetti-effect"
import { FireworksEffect } from "@/components/effect/fireworks-effect"
import { FrameworkComparison } from "@/components/effect/framework-comparison"
import { PartyEffects } from "@/components/effect/party-effects"
import { useStore } from "@/lib/store"
import type { HomePageData } from "@/pages/index/+data"
import { CallToAction } from "@/pages/index/components/call-to-action"
import { Footer } from "@/pages/index/components/footer"
import { FrameworkDisplay } from "@/pages/index/components/framework-display"
import { PartyCategories } from "@/pages/index/components/party-categories"
import { StatsSection } from "@/pages/index/components/stats-section"
import { WelcomeBanner } from "@/pages/index/components/welcome-banner"
import React, { useEffect, useMemo, useState } from "react"
import { useData } from "vike-react/useData"

const Page = () => {
  const { partyList, i18n }: HomePageData = useData()
  const [showFireworks, setShowFireworks] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const currentParty = useMemo(() => partyList.find((party) => party.name === selectedCategory), [selectedCategory])
  const { theme } = useStore()
  const isDark = useMemo(() => theme === "dark", [theme])

  useEffect(() => {
    if (partyList.length > 0 && !selectedCategory) {
      setSelectedCategory(partyList[0].name)
    }
  }, [partyList])

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

  const framersCount = partyList.reduce((count, party) => count + party.frameworkSupport.length, 0)
  const featureDetailCount = partyList.reduce((count, party) => count + (party.detailList?.length || 0), 0)

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? "dark bg-black" : "bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100"}`}>
      <PartyEffects />
      {showConfetti && <ConfettiEffect />}
      {showFireworks && <FireworksEffect />}
      <AppHeader />
      <WelcomeBanner i18n={i18n} party={partyList[0]} />
      <StatsSection i18n={i18n} framersCount={framersCount} featureDetailCount={featureDetailCount} />

      <section id="main" className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 mb-6 sm:mb-8 shadow-xl">
              <span className="text-xl sm:text-2xl animate-spin">🎪</span>
              <span className="font-bold text-sm sm:text-base md:text-lg">{i18n.home.guest.title}</span>
              <span className="text-xl sm:text-2xl animate-spin">🎪</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
              {i18n.home.guest.subTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 order-2 lg:order-1">
              <PartyCategories categories={partyList} selectedCategory={selectedCategory} onCategorySelect={(key) => setSelectedCategory(key)} />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <FrameworkDisplay i18n={i18n} currentParty={currentParty} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">{currentParty && <FrameworkComparison i18n={i18n} data={currentParty} />}</div>
      </section>

      {/*<FeaturesSection i18n={i18n} />*/}
      <CallToAction i18n={i18n} />
      <Footer i18n={i18n} />
    </div>
  )
}

export default Page
