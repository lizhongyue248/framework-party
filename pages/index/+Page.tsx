import { useStore } from "@/lib/store"
import { Counter } from "./Counter.js"

export default function Page() {
  const theme = useStore()
  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>My Vike app</h1>
      This page is: {theme.theme}
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  )
}
