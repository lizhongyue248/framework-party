import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { I18nData } from "@/types/i18n"
import { SiGithub } from "@icons-pack/react-simple-icons"
import type React from "react"

interface CallToActionProps {
  i18n: I18nData
}

export const CallToAction: React.FC<CallToActionProps> = ({ i18n }) => {
  return (
    <section className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 md:mb-8 leading-tight">{i18n.home.party.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed px-2">{i18n.home.party.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {/*<Button*/}
              {/*  size="lg"*/}
              {/*  className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"*/}
              {/*>*/}
              {/*  <Rocket className="h-6 w-6 mr-3" />*/}
              {/*  {i18n.home.party.action}*/}
              {/*</Button>*/}
              <a href={"https://github.com/lizhongyue248/framework-party"} target={"_blank"} rel={"noreferrer"} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-purple-600 rounded-full px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold hover:scale-105 transition-all duration-300 bg-transparent min-h-[48px] touch-manipulation"
                >
                  <SiGithub className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="truncate">{i18n.home.party.github}</span>
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
