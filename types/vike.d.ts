import type { ContentSidebarData, NavData } from "@/types/index"

declare global {
  namespace Vike {
    interface PageContext {
      nav?: NavData[]
      sidebar?: ContentSidebarData
    }
  }
}
