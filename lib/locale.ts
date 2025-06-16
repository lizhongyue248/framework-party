export const locales = ["en", "zh"]
export const localeDefault = locales[0]

export const extractLocale = (urlPathname: string) => {
  const path = urlPathname.split("/")

  let locale: string
  let urlPathnameWithoutLocale: string

  const first = path[1]
  if (locales.includes(first)) {
    locale = first
    urlPathnameWithoutLocale = `/${path.slice(2).join("/")}`
  } else {
    locale = localeDefault
    urlPathnameWithoutLocale = urlPathname
  }

  return { locale, urlPathnameWithoutLocale }
}
