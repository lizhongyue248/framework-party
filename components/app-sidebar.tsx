import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import type { ContentSidebarData } from "@/types"

interface AppSidebarProps {
  sidebarData?: ContentSidebarData | undefined
}

export function AppSidebar({ sidebarData }: AppSidebarProps) {
  const handleToIdClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const url = new URL(window.location.href)
      url.hash = id
      history.pushState({}, "", url)

      element.scrollIntoView({
        behavior: "smooth"
      })
    }
  }
  return (
    <SidebarMenu className={"h-full px-2 w-64 border-r"}>
      <SidebarContent>
        {sidebarData?.data.map((featureData) => (
          <SidebarMenuItem key={`sidebar-${featureData.feature}`}>
            <SidebarMenuButton className={"font-bold"} onClick={() => handleToIdClick(featureData.feature)}>
              {featureData.feature}
            </SidebarMenuButton>
            {featureData.item.length > 0 &&
              featureData.item.map((detailData) => (
                <SidebarMenuSub key={`detail-${detailData.detail}`}>
                  <SidebarMenuSubItem onClick={() => handleToIdClick(detailData.detail)}>
                    <SidebarMenuSubButton>{detailData.detail}</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              ))}
          </SidebarMenuItem>
        ))}
      </SidebarContent>
    </SidebarMenu>
  )
}
