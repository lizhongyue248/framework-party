import { getAllFrameworkContents, getContentSummary, getLocaleData } from "@/lib/file"
import { localeDefault } from "@/lib/locale"
import type { PartyInfo } from "@/types"
import type { I18nData } from "@/types/i18n"
import type { PageContextClient, PageContextServer } from "vike/types"

export interface HomePageData {
  partyList: PartyInfo[]
  i18n: I18nData
}

export const data = (pageContext: PageContextServer | PageContextClient): HomePageData => {
  const locale = pageContext.locale || localeDefault

  const frameworkContents = getAllFrameworkContents(locale)
  const i18n = getLocaleData(locale)
  const partyList = getContentSummary(frameworkContents)
  return {
    partyList,
    i18n
  }
}
