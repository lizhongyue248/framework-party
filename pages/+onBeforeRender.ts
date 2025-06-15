import type { PageContextServer } from "vike/types"

const onBeforeRender = async (pageContext: PageContextServer) => {
  return {
    pageContext: {}
  }
}
export default onBeforeRender
