import { useLoaderData, useSearchParams } from "@remix-run/react"
import type { loader } from "~/routes/_index.($doctype)/route"
import { getLabel } from "~/utils"
import { Languages } from "lucide-react"
import classNames from "classnames"
import { useMemo, useState } from 'react'
import { useTranslation } from "react-i18next"

const Header = () => {
  const { doctype, doctypeList } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const lng = useMemo(() => {
    return searchParams.get("lng")
  }, [searchParams])
  return (
    <div className="navbar bg-base-100 border-b backdrop-blur z-50">
      <div className="flex-1">
        <div className="btn btn-ghost text-xl">🥳 Framework Party</div>
      </div>
      <div className="flex-none flex flex-row gap-x-4">
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-ghost btn-sm text-sm"
          >
            <Languages />
          </div>
          <ul className="dropdown-content menu rounded-box z-[60] bg-base-100 p-2 shadow">
            {["en", "zh"].map((item) => (
              <li key={item}>
                <button
                  type={'button'}
                  className={classNames(
                    "text-nowrap",
                    searchParams.get("lng") === item && "active"
                  )}
                  onClick={async () => {
                    await i18n.changeLanguage(item, () => {
                      setSearchParams((prev) => {
                        prev.set("lng", item)
                        return prev
                      })
                    })
                  }}
                >
                  {item === "en" ? "English" : "简体中文"}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline btn-sm text-sm"
          >
            {getLabel(doctype, "DOCTYPE")}
          </div>
          <ul className="dropdown-content menu rounded-box z-[60] bg-base-100 p-2 shadow">
            {doctypeList.map((item) => (
              <li key={item.value}>
                <a href={`/${item.value}${lng ? `?lng=${lng}` : ''}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
