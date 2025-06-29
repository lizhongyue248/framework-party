import { REPO_PREFIX, getCurrentContent, getRepoName, readJsonFile } from "@/lib/file"
import { localeDefault, locales } from "@/lib/locale"
import type { ContentData } from "@/pages/@content/+data"
import type { ContentSidebarData, LanguageOption, NavData } from "@/types"
import type { OnBeforePrerenderStartAsync } from "vike/types"

export { onBeforePrerenderStart }

type OnBeforePrerenderStartReturnType = ReturnType<OnBeforePrerenderStartAsync<ContentData>>

const onBeforePrerenderStart: OnBeforePrerenderStartAsync<ContentData> = async (): OnBeforePrerenderStartReturnType => {
  console.log("onBeforePrerenderStart....")
  const urlsWithPageContext: Awaited<OnBeforePrerenderStartReturnType> = []
  for (const locale of locales) {
    const navData = readJsonFile<NavData[]>("nav.json", locale as LanguageOption)
    const sidebarList = readJsonFile<ContentSidebarData[]>("sidebar.json", locale as LanguageOption)
    const currentLocalePage = sidebarList.map((content) => {
      const targetPath = content.content.replaceAll(REPO_PREFIX, "")
      return {
        url: `/${locale}/${targetPath}`,
        pageContext: {
          data: {
            nav: navData,
            sidebar: content,
            locale,
            urlLogical: `/${targetPath}`,
            currentContent: getCurrentContent(getRepoName(content.repository), locale as LanguageOption)
          }
        }
      }
    })
    urlsWithPageContext.push(...currentLocalePage)
    if (locale === localeDefault) {
      const defaultLocalePage = sidebarList.map((content) => {
        const targetPath = content.content.replaceAll(REPO_PREFIX, "")
        return {
          url: `/${targetPath}`,
          pageContext: {
            data: {
              nav: navData,
              sidebar: content,
              locale,
              urlLogical: `/${targetPath}`,
              currentContent: getCurrentContent(getRepoName(content.repository), locale as LanguageOption)
            }
          }
        }
      })
      urlsWithPageContext.push(...defaultLocalePage)
    }
  }
  return urlsWithPageContext
}
