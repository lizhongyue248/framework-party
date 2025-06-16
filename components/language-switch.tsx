import { Languages } from "lucide-react"
import React from "react"
import { usePageContext } from "vike-react/usePageContext"
import { navigate } from "vike/client/router"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const LanguageSwitch = () => {
  const { locale, urlLogical } = usePageContext()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="size-8">
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(to) => {
            void navigate(`/${to}${urlLogical}`)
          }}
        >
          <DropdownMenuRadioItem value="zh">中文</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitch
