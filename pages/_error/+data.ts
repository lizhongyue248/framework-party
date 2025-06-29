import { getAllFrameworkContents, getLocaleData, getRepoName } from "@/lib/file"
import { localeDefault } from "@/lib/locale"
import type { I18nData } from "@/types/i18n"
import type { PageContextClient, PageContextServer } from "vike/types"

type QuickLink = { name: string; description: string; link: string }

export interface ErrorData {
  i18n: I18nData
  links: QuickLink[]
}

export const data = (pageContext: PageContextServer | PageContextClient): ErrorData => {
  const locale = pageContext.locale || localeDefault
  const frameworkContents = getAllFrameworkContents(locale)
  const links: QuickLink[] = []
  for (const content of frameworkContents) {
    console.log(getRepoName(content.repository))
    links.push({
      name: content.name,
      description: content.description,
      link: getRepoName(content.repository)
    })
  }
  return {
    i18n: getLocaleData(locale),
    links
  }
}
