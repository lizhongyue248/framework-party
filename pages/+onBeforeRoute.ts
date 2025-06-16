import { extractLocale } from "@/lib/locale"
import { modifyUrl } from "vike/modifyUrl"
import type { PageContextServer } from "vike/types"

const onBeforeRoute = async (pageContext: PageContextServer) => {
  const url = pageContext.urlParsed
  const { urlPathnameWithoutLocale, locale } = extractLocale(url.pathname)
  const urlLogical = modifyUrl(url.href, { pathname: urlPathnameWithoutLocale })
  return {
    pageContext: {
      locale,
      urlLogical
    }
  }
}
export default onBeforeRoute
