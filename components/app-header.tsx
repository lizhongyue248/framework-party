import LanguageSwitch from "@/components/language-switch"
import { Link } from "@/components/link"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { REPO_PREFIX, cn } from "@/lib/utils"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Menu } from "lucide-react"
import React from "react"

interface NavItem {
  id: string
  name: string
}

interface AppHeaderProps {
  navItems?: NavItem[]
  className?: string
}

export const AppHeader = ({ navItems, className }: AppHeaderProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/20 dark:bg-black/20 backdrop-blur-lg border-b-2 border-purple-200/50 dark:border-purple-700/50 transition-all duration-300 px-4 py-2",
        className
      )}
    >
      <nav className="flex justify-between items-center  mx-auto w-full">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="text-xl sm:text-2xl md:text-3xl text-purple-600 dark:text-purple-400">🥳</div>
          <Link href={"/"}>
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse">
              <span className="hidden sm:inline">Framework Party</span>
              <span className="sm:hidden">Framework</span>
            </h1>
          </Link>
        </div>

        {/* 中间导航 - 只在有navItems且屏幕足够大时显示 */}
        {navItems && navItems.length > 0 && (
          <nav className="hidden lg:flex flex-row gap-2">
            {navItems.map((item) => (
              <a key={item.id} href={`/${item.id.replaceAll(REPO_PREFIX, "")}`} className="text-sm text-primary">
                {item.name}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-4">
            <ThemeSwitch />
            <LanguageSwitch />
          </div>
          <div className="sm:hidden flex items-center space-x-2">
            <ThemeSwitch />
            <LanguageSwitch />
          </div>
          <a href="https://github.com/lizhongyue248/framework-party" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub repository">
            <Button variant="outline" size="icon" className="size-8">
              <SiGithub className="size-4" />
            </Button>
          </a>

          {/* 移动端下拉菜单 - 只在有navItems时显示 */}
          {navItems && navItems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden size-8">
                  <Menu className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.id} className="border-b" asChild>
                    <Link href={`/${item.id.replaceAll(REPO_PREFIX, "")}`}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  )
}
