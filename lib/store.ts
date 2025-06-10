import { create } from "vike-react-zustand"

export type ThemeType = "light" | "dark" | "system"
export type LanguageOption = "zh" | "en"

interface Store {
  theme: ThemeType
  language: LanguageOption
  setTheme: (theme: ThemeType) => void
  setLanguage: (language: LanguageOption) => void
}

export const useStore = create<Store>((set) => ({
  theme: "system",
  language: "zh",
  setTheme: (theme: ThemeType) =>
    set((state) => ({ ...state, theme })),
  setLanguage: (language: LanguageOption) =>
    set((state) => ({ ...state, language }))
}))
