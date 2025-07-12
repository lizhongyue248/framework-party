import type { I18nData } from "@/types/i18n"
import { Sparkles } from "lucide-react"
import type React from "react"

interface FooterProps {
  i18n: I18nData
}

export const Footer: React.FC<FooterProps> = ({ i18n }) => {
  return (
    <footer className="relative z-10 bg-black text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 mt-12 sm:mt-16 md:mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-400 animate-pulse flex-shrink-0" />
            <span className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Framework Party
            </span>
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-pink-400 animate-pulse flex-shrink-0" />
          </div>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">{i18n.home.footer.description}</p>
        </div>

        {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">*/}
        {/*  <div className="text-center">*/}
        {/*    <h3 className="text-xl font-bold mb-4 text-purple-400">🚀 Quick Start</h3>*/}
        {/*    <ul className="space-y-2 text-gray-400">*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          Getting Started*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          Documentation*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          Examples*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*  <div className="text-center">*/}
        {/*    <h3 className="text-xl font-bold mb-4 text-pink-400">🌟 Community</h3>*/}
        {/*    <ul className="space-y-2 text-gray-400">*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          GitHub*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          Discord*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          Contribute*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*  <div className="text-center">*/}
        {/*    <h3 className="text-xl font-bold mb-4 text-orange-400">🎉 Resources</h3>*/}
        {/*    <ul className="space-y-2 text-gray-400">*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          Blog*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          Tutorials*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="#" className="hover:text-white transition-colors">*/}
        {/*          Newsletter*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            © 2025 Framework Party. Made with ❤️ by the{" "}
            <a
              href={"https://github.com/lizhongyue248"}
              target={"_blank"}
              rel={"noreferrer"}
              className="text-purple-400 hover:text-purple-300 transition-colors duration-200 underline decoration-purple-400/50 hover:decoration-purple-300"
            >
              ZYUE
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
