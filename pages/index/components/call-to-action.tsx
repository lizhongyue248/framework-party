import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { I18nData } from "@/types/i18n"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Rocket } from "lucide-react"
import type React from "react"

interface CallToActionProps {
  i18n: I18nData
}

export const CallToAction: React.FC<CallToActionProps> = ({ i18n }) => {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">{i18n.home.party.title} 🎊</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">{i18n.home.party.description}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                <Rocket className="h-6 w-6 mr-3" />
                {i18n.home.party.action}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 rounded-full px-12 py-4 text-xl font-bold hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <SiGithub className="h-6 w-6 mr-3" />
                {i18n.home.party.github}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
