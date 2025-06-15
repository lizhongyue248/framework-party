import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { Counter } from "./Counter.js"

export default function Page() {
  const { setTheme, theme } = useTheme()
  return (
    <div>
      <h1 className={"font-bold text-3xl pb-4"}>My Vike app</h1>
      This page is: {theme}
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <Button onClick={() => setTheme("light")}>Light</Button>
      <Button onClick={() => setTheme("dark")}>dark</Button>
    </div>
  )
}
