import { usePageContext } from "vike-react/usePageContext"
import ErrorPage from "./components/error-page"

export default function Page() {
  const { is404 } = usePageContext()
  if (is404) {
    return <ErrorPage errorCode="404" />
  }
  return <ErrorPage errorCode="500" />
}
