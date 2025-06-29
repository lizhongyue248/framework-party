import { getAllFrameworkContents, getContentSummary, getLocaleData } from "@/lib/file"
import { localeDefault, locales } from "@/lib/locale"
import type { HomePageData } from "@/pages/index/+data"
import type { LanguageOption } from "@/types"
import type { OnBeforePrerenderStartAsync } from "vike/types"

export { onBeforePrerenderStart }

type OnBeforePrerenderStartReturnType = ReturnType<OnBeforePrerenderStartAsync<HomePageData>>

const onBeforePrerenderStart: OnBeforePrerenderStartAsync<HomePageData> = async (): OnBeforePrerenderStartReturnType => {
  const urlsWithPageContext: Awaited<OnBeforePrerenderStartReturnType> = []
  for (const locale of locales) {
    const i18n = getLocaleData(locale as LanguageOption)
    const frameworkContents = getAllFrameworkContents(locale as LanguageOption)
    const partyList = getContentSummary(frameworkContents)
    urlsWithPageContext.push({
      url: `/${locale}`,
      pageContext: {
        data: { i18n, partyList }
      }
    })
    if (locale === localeDefault) {
      urlsWithPageContext.push({
        url: "/",
        pageContext: {
          data: { i18n, partyList }
        }
      })
    }
  }
  return urlsWithPageContext
}
