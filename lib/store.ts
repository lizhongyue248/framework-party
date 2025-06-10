import { create } from "vike-react-zustand"
import { immer } from "zustand/middleware/immer"

export type ThemeType = "light" | "dark" | "system"
export type LanguageOption = "zh" | "en"

interface Store {
  theme: ThemeType
  language: LanguageOption
  setTheme: (theme: ThemeType) => void
  setLanguage: (language: LanguageOption) => void
}

export const useStore = create<Store>()(
  immer((set) => ({
    theme: "system",
    language: "zh",
    setTheme: (theme: ThemeType) =>
      set((state) => {
        state.theme = theme
      }),
    setLanguage: (language: LanguageOption) =>
      set((state) => {
        state.language = language
      })
  }))
)
