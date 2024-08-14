import { useLoaderData } from "@remix-run/react"
import type { loader } from "~/routes/_index.($doctype)/route"
import { getLabel } from '~/utils'

const Header = () => {
  const { doctype, doctypeList } = useLoaderData<typeof loader>()
  return (
    <div className="navbar bg-base-100 border-b backdrop-blur z-50">
      <div className="flex-1">
        <div className="btn btn-ghost text-xl">Framework Party</div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn">{getLabel(doctype, "DOCTYPE")}</div>
          <ul className="dropdown-content menu rounded-box z-[60] bg-base-100 p-2 shadow">
            {doctypeList.map((item) => (
              <li key={item.value}>
                <a href={`/${item.value}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
