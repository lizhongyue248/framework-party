import { Link, useLoaderData, useLocation } from '@remix-run/react'
import type { loader } from "~/routes/_index.($doctype)/route"

const Aside = () => {
  const location = useLocation()

  const { currentDocInformation } = useLoaderData<typeof loader>()
  if (!currentDocInformation) {
    return (
      <aside
        className={
          "sticky flex-shrink-0 w-[300px] overflow-y-auto top-0 pr-8 max-h-screen border-r"
        }
      >
        Aside
      </aside>
    )
  }
  return (
    <aside
      className={
        "sticky flex-shrink-0 overflow-y-auto top-0 max-h-screen border-r"
      }
    >
      <ul className="menu rounded-box w-56">
        {currentDocInformation.categoryList.map((category) => (
          <li key={category.value}>
            <h2 className="menu-title text-base-content">{category.label}</h2>
            <ul>
              {category.children.map((subCategory) => (
                <li key={`sub-${subCategory.value}`}>
                  <Link
                    preventScrollReset
                    to={{ search: location.search, hash: `#${subCategory.value}` }}
                  >{subCategory.label}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Aside
