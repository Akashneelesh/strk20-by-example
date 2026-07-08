export interface Route {
  path: string
  title: string
}

// Concepts - root paths. Order = reading order (prev/next follows array order).
export const CONCEPT_ROUTES: Route[] = [
  {
    path: "what-is-strk20",
    title: "What is STRK20?",
  },
]

export const SDK_ROUTES: Route[] = [
  {
    path: "getting-started",
    title: "Getting Started",
  },
]

export const HELPER_ROUTES: Route[] = [
  {
    path: "escrow",
    title: "Escrow",
  },
]

export const APP_ROUTES: Route[] = []

export const ROUTES_BY_CATEGORY = [
  {
    title: "",
    routes: CONCEPT_ROUTES.map((route) => ({
      ...route,
      path: `/${route.path}`,
    })),
  },
  {
    title: "SDK",
    routes: SDK_ROUTES.map((route) => ({
      ...route,
      path: `/sdk/${route.path}`,
    })),
  },
  {
    title: "Helper Contracts",
    routes: HELPER_ROUTES.map((route) => ({
      ...route,
      path: `/helpers/${route.path}`,
    })),
  },
  {
    title: "Applications",
    routes: APP_ROUTES.map((route) => ({
      ...route,
      path: `/app/${route.path}`,
    })),
  },
]

export const ROUTES = ROUTES_BY_CATEGORY.map(({ routes }) => routes).flat()
export const ROUTE_INDEX_BY_PATH = ROUTES.reduce((map, route: Route, i) => {
  // @ts-ignore
  map[route.path] = i
  return map
}, {})

export function getPrevNextPaths(path: string): {
  prev: Route | null
  next: Route | null
} {
  // @ts-ignore
  const index = ROUTE_INDEX_BY_PATH[path]
  if (index >= 0) {
    const prev = ROUTES[index - 1] || null
    const next = ROUTES[index + 1] || null
    return { prev, next }
  }
  return {
    prev: null,
    next: null,
  }
}
