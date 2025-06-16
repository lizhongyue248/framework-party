import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import type { ThemeType } from "@/types"
import { MoonIcon, SunIcon } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
export const ThemeSwitch = () => {
  const { theme, setTheme } = useStore()
  const ref = useRef<HTMLButtonElement>(null)

  const toggleDarkMode = async (theme: ThemeType) => {
    if (!ref.current || !document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(theme)
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme)
      })
    }).ready

    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`]
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)"
      }
    )
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <Button ref={ref} variant="secondary" size="icon" className="size-8" onClick={() => toggleDarkMode(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </Button>
  )
}
