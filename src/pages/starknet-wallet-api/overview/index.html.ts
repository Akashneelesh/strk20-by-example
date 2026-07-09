// metadata
export const version = "0.14.2"
export const title = "Starknet Wallet API"
export const description =
  "The standard route for private dapps on Starknet: ask a privacy-enabled wallet to shield, transfer, and withdraw via starknet.js."
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "starknet wallet api",
  "wallet api",
  "starknet.js",
  "useStrk20",
  "WalletAccountV6",
  "private dapp",
  "shield",
  "private transfer",
  "withdraw",
  "privacy wallet",
]

export const codes = []

const html = `<p>The <strong>Starknet Wallet API</strong> is the recommended route for most <strong>private dapps</strong>.
Instead of managing private state yourself, your dapp asks the user&#39;s
privacy-enabled wallet
to perform a private action, and the wallet handles keys, notes, proving, and
submission.</p>
<p>Use this route when you are building an app <strong>on top of</strong> existing privacy
wallets. If you are building the wallet itself, use the
<a href="/sdk/getting-started">Build Privacy Wallets</a>. If your app needs private DeFi,
pair this route with a <a href="/helpers/privacy-invoke">Helper Contract</a>.</p>
<h2>Why most dapps want this route</h2>
<ul>
<li><strong>No viewing keys in your app.</strong> The wallet holds the user&#39;s viewing key; your
dapp never sees it.</li>
<li><strong>No note or proof management.</strong> The wallet discovers notes, builds the
transaction, generates the proof, and submits it.</li>
<li><strong>Standard Starknet integration.</strong> You connect and call through <code>starknet.js</code>
and the user&#39;s wallet, the same way you already integrate other Starknet
actions.</li>
</ul>
<h2>How it fits together</h2>
<p>Your dapp talks to <code>starknet.js</code>, which reaches the user&#39;s privacy-enabled wallet
through the Starknet Wallet API. The wallet runs the STRK20 SDK internally and
settles against the privacy pool. For private DeFi, the same call path also triggers your app-specific
<a href="/helpers/privacy-invoke">helper contract</a>.</p>
<h2>React hooks or direct WalletAccountV6?</h2>
<p>There are two practical ways to use the Starknet Wallet API from a dapp, each with
its own page in this section:</p>
<ul>
<li><strong>React dapps:</strong> use the
<a href="/starknet-wallet-api/starknet-start-hook">starknet-start <code>useStrk20</code> hooks</a>, a
convenience wrapper that calls into a <code>WalletAccountV6</code> (or equivalent) under the
hood.</li>
<li><strong>Outside React, or when you need finer control</strong> over connection and proof
handling: use
<a href="/starknet-wallet-api/starknet-js">starknet.js <code>WalletAccountV6</code></a> directly.</li>
</ul>
<p>In both cases the wallet itself must support the STRK20 wallet API methods, since
the ZK proofs and signatures are managed wallet-side.</p>
<h2>What you can do through the wallet</h2>
<p>Without writing any privacy cryptography, a dapp can ask the wallet to:</p>
<ul>
<li><strong>Shield</strong> - deposit public ERC-20 tokens into the pool.</li>
<li><strong>Private transfer</strong> - move value privately between registered users.</li>
<li><strong>Withdraw (unshield)</strong> - move tokens back out to a public address.</li>
<li><strong>Swap</strong> - where the connected wallet supports it.</li>
</ul>
<p>Broader DeFi actions (lending, staking, custom flows) pair the Starknet Wallet
API with an app-specific helper contract that the pool invokes atomically.</p>
<h2>What to keep in mind</h2>
<ul>
<li><strong>Wallet support varies.</strong> Available actions depend on the connected wallet;
detect capabilities before offering an action.</li>
<li><strong>Edges stay public.</strong> Deposits and withdrawals expose public ERC-20 legs and
timing, even though in-pool movement is private.</li>
<li><strong>Verify versions and addresses.</strong> Confirm wallet, <code>starknet.js</code>, and pool
contract details for your target network before launch.</li>
</ul>
<h2>Choose your route</h2>
<table>
<thead>
<tr>
<th>You are building...</th>
<th>Start here</th>
</tr>
</thead>
<tbody><tr>
<td>A private dapp anywhere from private DeFi, private consumer apps, private games, etc.</td>
<td><a href="/helpers/privacy-invoke">Helper Contracts</a> and Starknet Wallet API (this page)</td>
</tr>
<tr>
<td>A Starknet privacy wallet</td>
<td><a href="/sdk/getting-started">Build Privacy Wallets</a></td>
</tr>
</tbody></table>
<h2>Read next</h2>
<ul>
<li><a href="/starknet-wallet-api/starknet-start-hook">starknet-start</a></li>
<li><a href="/starknet-wallet-api/starknet-js">starknet.js</a></li>
<li><a href="/helpers/privacy-invoke">Helper Contract Anatomy</a></li>
<li><a href="/sdk/getting-started">Build Privacy Wallets</a></li>
</ul>
`

export default html
