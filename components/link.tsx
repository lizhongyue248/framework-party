import { localeDefault } from "@/lib/locale" // or vike-vue / vike-solid
import type React from "react"
import { usePageContext } from "vike-react/usePageContext"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  locale?: string
}

export const Link = ({ href, locale, ...props }: LinkProps) => {
  const pageContext = usePageContext()
  locale = locale ?? pageContext.locale
  if (locale !== localeDefault) {
    href = `/${locale}${href}`
  }
  return <a href={href} {...props} />
}
