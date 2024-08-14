import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useLoaderData
} from '@remix-run/react'
import "./tailwind.css"
import { useChangeLanguage } from "remix-i18next/react";
import type React from "react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import i18next from "~/server/i18next.server"
import { useTranslation } from 'react-i18next'

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request)
  return json({ locale })
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common"
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  // Get the locale from the loader
  const { locale } = useLoaderData<typeof loader>()

  const { i18n } = useTranslation()

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale)

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Framework Party</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const App = () => {
  return <Outlet />
}

export default App
