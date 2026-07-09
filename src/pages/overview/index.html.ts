// metadata
export const version = "0.14.2"
export const title = "Overview"
export const description =
  "A concise builder overview for choosing the right STRK20 integration route"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "overview",
  "get started",
  "strk20",
  "privacy stack",
  "wallet api",
  "helper contracts",
  "privacy sdk",
]

export const codes = []

const html = `<p>Here&#39;s everything about getting started with building private applications.</p>
<p>Starknet privacy has a small set of builder surfaces. Start with the highest-level
route that fits your product, and only move lower when you need more control.</p>
<h2>Choose your integration route</h2>
<table>
<thead>
<tr>
<th>Builder goal</th>
<th>Start with</th>
</tr>
</thead>
<tbody><tr>
<td>Build a private dapp anywhere from private DeFi, private consumer apps, private games, etc.</td>
<td><a href="/helpers/privacy-invoke">Helper Contracts</a> and <a href="/starknet-wallet-api/overview">Starknet Wallet API</a></td>
</tr>
<tr>
<td>Build a privacy wallet or advanced backend</td>
<td><a href="/sdk/getting-started">Build Privacy Wallets</a></td>
</tr>
<tr>
<td>Run proof infrastructure yourself</td>
<td>Prover backend</td>
</tr>
<tr>
<td>Hide a user&#39;s main-wallet link during account-based app activity</td>
<td>Private sub-accounts (coming soon)</td>
</tr>
</tbody></table>
<h2>Core pieces</h2>
<ul>
<li><strong>STRK20 Pool:</strong> the live Starknet mainnet pool that holds ERC-20s as encrypted
notes and enables shielded balances, private transfers, and private DeFi.</li>
<li><strong>Starknet Wallet API / starknet.js:</strong> the standard route for private dapps. The
app asks the wallet to act; the wallet manages viewing keys, notes, proofs, and
signatures.</li>
<li><strong>Helper contracts:</strong> app-specific <code>privacy_invoke</code> adapters for DeFi. The pool
calls the helper atomically, then credits the result back into private notes.</li>
<li><strong>Privacy SDK:</strong> the low-level route for wallets and advanced integrations that
need direct control over registration, channels, note discovery, and proving.</li>
<li><strong>Private sub-accounts (coming soon):</strong> an advanced account-privacy route for hiding the public
link between a user&#39;s main wallet and app activity.</li>
<li><strong>Prover backend:</strong> infrastructure for teams that need to operate their own proof
generation.</li>
</ul>
<h2>What stays visible</h2>
<p>Inside the pool, sender, receiver, token, amount, and spent notes are private.
Deposits, withdrawals, timing, and some app-side activity may still be public.</p>
<h2>Read next</h2>
<ul>
<li><a href="/helpers/privacy-invoke">Helper Contracts</a></li>
<li><a href="/starknet-wallet-api/overview">Starknet Wallet API</a></li>
<li><a href="/sdk/getting-started">Build Privacy Wallets</a></li>
</ul>
`

export default html
