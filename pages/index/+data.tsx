import { getAllFrameworkContents, getLocaleData } from "@/lib/file"
import { localeDefault } from "@/lib/locale"
import type { I18nData } from "@/types/i18n"
import type { PageContextClient, PageContextServer } from "vike/types"

type FrameworkSupport = { name: string; logo: string; detail: Record<string, boolean> }

export interface PartyInfo {
  name: string
  description: string
  detailList: string[]
  frameworkSupport: FrameworkSupport[]
}

export interface HomePageData {
  partyList: PartyInfo[]
  i18n: I18nData
}

export const data = (pageContext: PageContextServer | PageContextClient): HomePageData => {
  const locale = pageContext.locale || localeDefault

  const frameworkContents = getAllFrameworkContents(locale)
  const i18n = getLocaleData(locale)
  const partyList: PartyInfo[] = []
  for (const content of frameworkContents) {
    const definitions = content.definitions
    const allDetail: string[] = []
    for (const definitionsKey in definitions) {
      const definition = definitions[definitionsKey]
      const detailList = definition["detail-list"]
      allDetail.push(...detailList)
    }
    const frameworkSupport: FrameworkSupport[] = []
    for (const framework of content.framework) {
      const featureSupport: Record<string, boolean> = {}
      for (const feature of framework.feature) {
        for (const detail of feature.detail) {
          featureSupport[detail.name] = allDetail.includes(detail.name)
        }
      }
      frameworkSupport.push({
        name: framework.name,
        logo: framework.logo,
        detail: featureSupport
      })
    }
    partyList.push({
      name: content.name,
      description: content.description,
      detailList: allDetail,
      frameworkSupport
    })
  }

  return {
    partyList,
    i18n
  }
}
