import { localeDefault, locales } from "@/lib/locale"
import type { LanguageOption } from "@/types"
import type { OnPrerenderStartAsync, PageContextServer } from "vike/types"

export const onPrerenderStart: OnPrerenderStartAsync = async (prerenderContext): ReturnType<OnPrerenderStartAsync> => {
  const pageContexts: PageContextServer[] = []
  for (const pageContext of prerenderContext.pageContexts) {
    if (pageContext.locale && pageContext.urlOriginal.startsWith(`/${pageContext.locale}/`)) {
      pageContexts.push(pageContext)
      continue
    }
    for (const locale of locales) {
      let { urlOriginal } = pageContext
      if (locale !== localeDefault) {
        urlOriginal = `/${locale}${pageContext.urlOriginal}`
      }
      pageContexts.push({
        ...pageContext,
        urlOriginal,
        locale: locale as LanguageOption
      })
    }
  }

  return {
    prerenderContext: {
      pageContexts
    }
  }
}
