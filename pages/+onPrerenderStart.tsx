import { localeDefault, locales } from "@/lib/locale"
import type { LanguageOption } from "@/types"
import type { OnPrerenderStartAsync, PageContextServer } from "vike/types"

export const onPrerenderStart: OnPrerenderStartAsync = async (prerenderContext): ReturnType<OnPrerenderStartAsync> => {
  const pageContexts: PageContextServer[] = []
  for (const pageContext of prerenderContext.pageContexts) {
    let { urlOriginal } = pageContext
    if (pageContext.locale && urlOriginal.startsWith(`/${pageContext.locale}/`)) {
      pageContexts.push({ ...pageContext, urlOriginal })
      continue
    }
    for (const locale of locales) {
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
