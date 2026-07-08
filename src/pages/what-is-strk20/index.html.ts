// metadata
export const version = "0.14.2"
export const title = "What is STRK20?"
export const description =
  "An introduction to Starknet Privacy - confidential token transfers on a public chain"
export const githubLink = ""

export const keywords = [
  "strk20",
  "privacy",
  "pool",
  "starknet",
  "introduction",
  "overview",
]

export const codes = []

const html = `<p>Starknet Privacy (STRK20) is a protocol for <strong>confidential ERC-20 transfers on Starknet</strong>.
Sender, receiver and amounts are hidden from outside observers, while validity is
enforced by client-side zero-knowledge proofs.</p>
<p>Funds move through a <strong>privacy pool</strong> — a smart contract that holds pooled ERC-20
tokens and tracks ownership with encrypted, UTXO-style records called <strong>notes</strong>.</p>
<h2>The lifecycle: public → private → public</h2>
<ol>
<li><strong>Deposit</strong> — move public ERC-20 tokens into the pool. The deposit itself is
visible on-chain (depositor and amount), but the resulting note is encrypted.</li>
<li><strong>Private transfers</strong> — transfer value inside the pool by spending notes and
creating new ones. Nobody watching the chain can tell who paid whom, or how much.</li>
<li><strong>Withdraw</strong> — move tokens back out of the pool to a public address.</li>
</ol>
<h2>What makes it different</h2>
<ul>
<li><strong>Native to Starknet</strong> — no separate chain or bridge. It runs as a contract on
Starknet and composes with existing accounts and DeFi.</li>
<li><strong>Variable amounts, reusable notes</strong> — unlike fixed-denomination mixers, notes
carry arbitrary amounts and change is handled automatically.</li>
<li><strong>Scalable discovery</strong> — recipients find their incoming funds by scanning only
their own channels, so cost scales with your activity, not total pool volume.</li>
<li><strong>Built-in compliance</strong> — at registration every user encrypts their private
viewing key to an auditor&#39;s public key, enabling selective disclosure under
lawful process while preserving everyone else&#39;s privacy.</li>
</ul>
<h2>The building blocks</h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>What it is</th>
</tr>
</thead>
<tbody><tr>
<td>Note</td>
<td>Immutable record of ownership of an amount of a token</td>
</tr>
<tr>
<td>Nullifier</td>
<td>One-time value revealed when spending a note (prevents double-spend)</td>
</tr>
<tr>
<td>Viewing key</td>
<td>Keypair used to encrypt/decrypt note data and derive nullifiers</td>
</tr>
<tr>
<td>Channel</td>
<td>Unidirectional sender → recipient lane where notes are stored</td>
</tr>
<tr>
<td>Helper contract</td>
<td>Small adapter that lets pool funds interact with external DeFi</td>
</tr>
</tbody></table>
<p>Each of these has its own page in the Concepts section — read them in order and
you will have the full mental model.</p>
<h2>Who this site is for</h2>
<ul>
<li><strong>App developers</strong> integrating private transfers with the TypeScript SDK — see
the SDK section.</li>
<li><strong>Cairo developers</strong> writing helper contracts (escrow, swaps, lending) that the
pool invokes atomically — see the Helper Contracts section.</li>
<li><strong>Anyone</strong> who wants to understand how private payments work on Starknet — start
with the Concepts pages.</li>
</ul>
`

export default html
