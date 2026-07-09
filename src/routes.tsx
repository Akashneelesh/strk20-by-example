import component_actions_and_proofs from "./pages/actions-and-proofs"
import component_app_anonymous_airdrop from "./pages/app/anonymous-airdrop"
import component_builder_privacy_overview from "./pages/builder-privacy-overview"
import component_channels_and_subchannels from "./pages/channels-and-subchannels"
import component_compliance from "./pages/compliance"
import component_helpers_escrow from "./pages/helpers/escrow"
import component_helpers_privacy_invoke from "./pages/helpers/privacy-invoke"
import component_helpers_swap_helper from "./pages/helpers/swap-helper"
import component_helpers_vesu_lending_helper from "./pages/helpers/vesu-lending-helper"
import component_notes_and_nullifiers from "./pages/notes-and-nullifiers"
import component_overview from "./pages/overview"
import component_sdk_deposit from "./pages/sdk/deposit"
import component_sdk_deposit_transfer_surplus from "./pages/sdk/deposit-transfer-surplus"
import component_sdk_discovery_providers from "./pages/sdk/discovery-providers"
import component_sdk_getting_started from "./pages/sdk/getting-started"
import component_sdk_multi_op_batch from "./pages/sdk/multi-op-batch"
import component_sdk_note_discovery from "./pages/sdk/note-discovery"
import component_sdk_proving_config from "./pages/sdk/proving-config"
import component_sdk_register from "./pages/sdk/register"
import component_sdk_setup_requirements from "./pages/sdk/setup-requirements"
import component_sdk_transfer from "./pages/sdk/transfer"
import component_sdk_withdraw from "./pages/sdk/withdraw"
import component_starknet_wallet_api_overview from "./pages/starknet-wallet-api/overview"
import component_starknet_wallet_api_starknet_js from "./pages/starknet-wallet-api/starknet-js"
import component_starknet_wallet_api_starknet_start_hook from "./pages/starknet-wallet-api/starknet-start-hook"
import component_viewing_keys from "./pages/viewing-keys"
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
    path: "/actions-and-proofs",
    component: component_actions_and_proofs,
  },
  {
    path: "/app/anonymous-airdrop",
    component: component_app_anonymous_airdrop,
  },
  {
    path: "/builder-privacy-overview",
    component: component_builder_privacy_overview,
  },
  {
    path: "/channels-and-subchannels",
    component: component_channels_and_subchannels,
  },
  {
    path: "/compliance",
    component: component_compliance,
  },
  {
    path: "/helpers/escrow",
    component: component_helpers_escrow,
  },
  {
    path: "/helpers/privacy-invoke",
    component: component_helpers_privacy_invoke,
  },
  {
    path: "/helpers/swap-helper",
    component: component_helpers_swap_helper,
  },
  {
    path: "/helpers/vesu-lending-helper",
    component: component_helpers_vesu_lending_helper,
  },
  {
    path: "/notes-and-nullifiers",
    component: component_notes_and_nullifiers,
  },
  {
    path: "/overview",
    component: component_overview,
  },
  {
    path: "/sdk/deposit",
    component: component_sdk_deposit,
  },
  {
    path: "/sdk/deposit-transfer-surplus",
    component: component_sdk_deposit_transfer_surplus,
  },
  {
    path: "/sdk/discovery-providers",
    component: component_sdk_discovery_providers,
  },
  {
    path: "/sdk/getting-started",
    component: component_sdk_getting_started,
  },
  {
    path: "/sdk/multi-op-batch",
    component: component_sdk_multi_op_batch,
  },
  {
    path: "/sdk/note-discovery",
    component: component_sdk_note_discovery,
  },
  {
    path: "/sdk/proving-config",
    component: component_sdk_proving_config,
  },
  {
    path: "/sdk/register",
    component: component_sdk_register,
  },
  {
    path: "/sdk/setup-requirements",
    component: component_sdk_setup_requirements,
  },
  {
    path: "/sdk/transfer",
    component: component_sdk_transfer,
  },
  {
    path: "/sdk/withdraw",
    component: component_sdk_withdraw,
  },
  {
    path: "/starknet-wallet-api/overview",
    component: component_starknet_wallet_api_overview,
  },
  {
    path: "/starknet-wallet-api/starknet-js",
    component: component_starknet_wallet_api_starknet_js,
  },
  {
    path: "/starknet-wallet-api/starknet-start-hook",
    component: component_starknet_wallet_api_starknet_start_hook,
  },
  {
    path: "/viewing-keys",
    component: component_viewing_keys,
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
