import component_helpers_escrow from "./pages/helpers/escrow"
import component_sdk_getting_started from "./pages/sdk/getting-started"
import component_what_is_strk20 from "./pages/what-is-strk20"
import component_ from "./pages"

interface Path {
  title: string
  path: string
}

interface Paths {
  prev: Path | null
  next: Path | null
}

interface Route {
  path: string
  component: React.FC<Paths>
  breakingChanges?: boolean
}

const routes: Route[] = [
  {
    path: "/helpers/escrow",
    component: component_helpers_escrow,
  },
  {
    path: "/sdk/getting-started",
    component: component_sdk_getting_started,
  },
  {
    path: "/what-is-strk20",
    component: component_what_is_strk20,
  },
  {
    path: "",
    component: component_,
  },
]

export default routes
