import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import type { ContentSidebarData } from "@/types"
import { useEffect, useState } from "react"

interface AppSidebarProps {
  sidebarData?: ContentSidebarData | undefined
}

export const AppSidebar = ({ sidebarData }: AppSidebarProps) => {
  const [currentAnchor, setCurrentAnchor] = useState<string | null>(null)

  const handleToIdClick = (id: string) => {
    const element = document.getElementById(id)
    const container = document.getElementById("container")
    if (element && container) {
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const topPosition = elementRect.top - containerRect.top + container.scrollTop
      const url = new URL(window.location.href)
      url.hash = id
      history.pushState({}, "", url)
      const headerHeight = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) || 0
      let scrollTarget = topPosition - headerHeight
      const parentElement = element.parentElement
      if (parentElement) {
        const prevElementRect = parentElement.getBoundingClientRect()
        scrollTarget = prevElementRect.top - containerRect.top + container.scrollTop - headerHeight
      }
      container.scrollTo({
        top: scrollTarget,
        behavior: "smooth"
      })
    }
  }

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrentAnchor(entry.target.id)
          }
        }
      },
      {
        root: document.getElementById("container"),
        rootMargin: "-200px 0px -50% 0px",
        threshold: 0
      }
    )

    if (sidebarData?.data) {
      for (const featureData of sidebarData.data) {
        const element = document.getElementById(featureData.feature)
        if (element) observer.observe(element)

        for (const detailData of featureData.item) {
          const detailElement = document.getElementById(detailData.detail)
          if (detailElement) observer.observe(detailElement)
        }
      }
    }

    return observer
  }

  useEffect(() => {
    const observer = setupIntersectionObserver()
    return () => observer.disconnect()
  }, [sidebarData])
  return (
    <>
      <Sidebar className={"w-64 border-r top-(--header-height) h-[calc(100svh-var(--header-height))]!"}>
        <SidebarContent className={"px-2 pt-2"}>
          <SidebarMenu>
            {sidebarData?.data.map((featureData) => (
              <SidebarMenuItem key={`sidebar-${featureData.feature}`}>
                <SidebarMenuButton isActive={currentAnchor === featureData.feature} className={"font-bold"} onClick={() => handleToIdClick(featureData.feature)}>
                  {featureData.feature}
                </SidebarMenuButton>
                {featureData.item.length > 0 &&
                  featureData.item.map((detailData) => (
                    <SidebarMenuSub key={`detail-${detailData.detail}`}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive={currentAnchor === detailData.detail} onClick={() => handleToIdClick(detailData.detail)}>
                          {detailData.detail}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  ))}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  )
}
