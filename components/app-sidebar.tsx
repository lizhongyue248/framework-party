import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import type { ContentSidebarData } from "@/types"
import { usePageContext } from "vike-react/usePageContext"

interface AppSidebarProps {
  sidebarData?: ContentSidebarData | undefined
}

export function AppSidebar({ sidebarData }: AppSidebarProps) {
  return (
    <SidebarMenu className={"h-full"}>
      <SidebarContent>
        {sidebarData?.data.map((featureData) => (
          <SidebarMenuItem key={`sidebar-${featureData.feature}`}>
            <SidebarMenuButton>{featureData.feature}</SidebarMenuButton>
            {featureData.item.length > 0 &&
              featureData.item.map((detailData) => (
                <SidebarMenuSub key={`detail-${detailData.detail}`}>
                  <SidebarMenuSubItem>
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
