export interface File {
  path: string
  language: string
  content?: string
  startLine?: number
  endLine?: number
}

export interface DetailItem {
  name: string
  description: string
  type: "detail"
  file: File[]
}

export interface Feature {
  name: string
  type: "group"
  description: string
  detailList: string[]
  detail: DetailItem[]
}

export interface Framework {
  name: string
  description: string
  version: string
  repository: string
  website: string
  license: string
  logo: string
  feature: Feature[]
}

export interface Content {
  name: string
  repository: string
  framework: Framework[]
  definitions?: Record<
    string,
    {
      type: string
      name: string
      description: string
      "detail-list": string[]
    }
  >
}

export type NavData = {
  name: string
  id: string
}

export type SidebarItemData = { detail: string }

export type SidebarListData = {
  feature: string
  item: SidebarItemData[]
}

export type ContentSidebarData = {
  content: string
  data: SidebarListData[]
}

export type ThemeType = "light" | "dark" | "system"
export type LanguageOption = "zh" | "en"
