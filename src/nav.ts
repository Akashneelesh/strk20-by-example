export interface Route {
  path: string
  title: string
}

export interface RouteGroup {
  title: string
  routes: Route[]
}

export interface RouteCategory {
  title: string
  routes?: Route[]
  groups?: RouteGroup[]
}

// Concepts - root paths. Order = reading order (prev/next follows array order).
export const CONCEPT_ROUTES: Route[] = [
  {
    path: "what-is-strk20",
    title: "What is STRK20?",
  },
  {
    path: "builder-privacy-overview",
    title: "Builder Privacy Overview",
  },
  {
    path: "notes-and-nullifiers",
    title: "Notes & Nullifiers",
  },
  {
    path: "viewing-keys",
    title: "Encryption & Viewing Keys",
  },
  {
    path: "channels-and-subchannels",
    title: "Channels & Note Discovery",
  },
  {
    path: "actions-and-proofs",
    title: "Actions, Phases & Proofs",
  },
  {
    path: "compliance",
    title: "Compliance & Auditing",
  },
]

// Starknet Wallet API - the standard route for private dapps via starknet.js.
export const STARKNET_WALLET_API_ROUTES: Route[] = [
  {
    path: "overview",
    title: "Overview",
  },
  {
    path: "starknet-start-hook",
    title: "starknet-start",
  },
  {
    path: "starknet-js",
    title: "starknet.js",
  },
]

// Build Privacy Wallets - the low-level SDK route for wallet builders and advanced integrators.
export const BUILD_PRIVACY_WALLET_ROUTES: Route[] = [
  {
    path: "getting-started",
    title: "Getting Started",
  },
  {
    path: "register",
    title: "Register",
  },
  {
    path: "deposit",
    title: "Deposit",
  },
  {
    path: "transfer",
    title: "Transfer",
  },
  {
    path: "deposit-transfer-surplus",
    title: "Deposit + Transfer",
  },
  {
    path: "withdraw",
    title: "Withdraw",
  },
  {
    path: "multi-op-batch",
    title: "Multi-Operation Batches",
  },
  {
    path: "setup-requirements",
    title: "Channels & Setup Requirements",
  },
  {
    path: "note-discovery",
    title: "Discovering Notes",
  },
  {
    path: "discovery-providers",
    title: "Discovery Providers",
  },
  {
    path: "proving-config",
    title: "Proving Configuration",
  },
]

export const HELPER_ROUTES: Route[] = [
  {
    path: "privacy-invoke",
    title: "Helper Contract Anatomy",
  },
  {
    path: "swap-helper",
    title: "Swap Helper",
  },
  {
    path: "vesu-lending-helper",
    title: "Vesu Lending Helper",
  },
  {
    path: "escrow",
    title: "Escrow",
  },
]

export const APP_ROUTES: Route[] = [
  {
    path: "anonymous-airdrop",
    title: "Anonymous Airdrop",
  },
]

function prefixRoutes(prefix: string, routes: Route[]): Route[] {
  return routes.map((route) => ({
    ...route,
    path: `${prefix}/${route.path}`,
  }))
}

export const ROUTES_BY_CATEGORY: RouteCategory[] = [
  {
    title: "",
    routes: prefixRoutes("", CONCEPT_ROUTES),
  },
  {
    title: "Get Started :\nBuild Private Applications",
    routes: [
      {
        path: "/overview",
        title: "Overview",
      },
    ],
    groups: [
      {
        title: "Helper Contracts",
        routes: prefixRoutes("/helpers", HELPER_ROUTES),
      },
      {
        title: "Starknet Wallet API",
        routes: prefixRoutes("/starknet-wallet-api", STARKNET_WALLET_API_ROUTES),
      },
    ],
  },
  {
    title: "Build Privacy Wallets",
    routes: prefixRoutes("/sdk", BUILD_PRIVACY_WALLET_ROUTES),
  },
  {
    title: "Applications",
    routes: prefixRoutes("/app", APP_ROUTES),
  },
]

export const ROUTES = ROUTES_BY_CATEGORY.map(({ routes = [], groups = [] }) => [
  ...routes,
  ...groups.map((group) => group.routes).flat(),
]).flat()
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
