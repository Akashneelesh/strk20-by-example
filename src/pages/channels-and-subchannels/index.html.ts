// metadata
export const version = "0.14.2"
export const title = "Channels & Note Discovery"
export const description =
  "Directional channels, per-token subchannels and the scan algorithm recipients use to find their notes"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "channel",
  "subchannel",
  "discovery",
  "scanning",
  "note index",
  "channel key",
]

export const codes = []

const html = `<p>There is no "inbox" for private payments. Encrypted notes sit silently in the
pool&#39;s storage until the recipient looks for them. <strong>Channels</strong> make that
lookup cheap and deterministic.</p>
<h2>Channels are directional lanes</h2>
<p>A channel is a <strong>sender → recipient</strong> lane. Its key is derived from the
sender&#39;s private viewing key and the recipient&#39;s public viewing key:</p>
<pre><code>channel_key = h(CHANNEL_KEY_TAG, sender_addr, sender_private_key,
                recipient_addr, recipient_public_key)
</code></pre><p>Both ends can reach the same secret - the sender directly, the recipient via
ECDH decryption of the channel record - but nobody else can. If Alice and Bob
pay each other, that is <strong>two</strong> channels, one per direction. Directionality
keeps sender authorization simple and recipient discovery deterministic.</p>
<p>A deposit is just a channel from yourself to yourself.</p>
<h2>Subchannels: one per token</h2>
<p>Inside a channel, notes are grouped by token. The first transfer of a given
token through a channel opens that token&#39;s <strong>subchannel</strong>, which holds the
encrypted token address and its own note index counter.</p>
<pre><code>Alice ──► Bob (channel)
   ├── subchannel[0]: USDC   ── note 0, note 1, note 2, ...
   └── subchannel[1]: STRK   ── note 0, note 1, ...

Alice ──► Alice (self-channel, used for deposits and change)
   └── subchannel[0]: USDC   ── note 0, note 1, ...
</code></pre><h2>Dense sequential indices</h2>
<p>Outgoing channels, subchannels and notes are all stored as <strong>dense sequential
lists</strong> - indices 0, 1, 2, … with no gaps, in WriteOnce storage. Density is
what makes scanning terminate: a reader walks each list until the first empty
slot and knows nothing is hidden beyond it.</p>
<h2>The discovery scan</h2>
<p>To find your incoming funds, given only your private viewing key:</p>
<ol>
<li><strong>Channels</strong> - scan channel entries addressed to you, attempting to decrypt
each channel record; success means "this channel is for me" and yields the
channel key.</li>
<li><strong>Subchannels</strong> - for each discovered channel, walk its subchannels
(index 0, 1, …) until the first empty slot, unmasking each token address.</li>
<li><strong>Notes</strong> - for each (channel, token) pair, walk note indices until the
first empty slot, unmasking amounts and checking each note&#39;s nullifier
against the on-chain nullifier set to skip spent ones.</li>
</ol>
<p>What is left is your spendable private balance. A stateless discovery service
can run this scan on your behalf - you send the viewing key per request, it
scans storage via RPC and returns decrypted notes without storing anything.</p>
<h2>Why this scales</h2>
<p>The scan touches only channels addressed to <em>you</em> and the notes inside them.
Cost is proportional to <strong>your own activity</strong> - how many counterparties pay you
and how many notes they send - not to total pool volume. A pool with millions
of transfers costs you no more to scan than a quiet one, which is what makes
private payments practical at chain scale.</p>
<p>Next: how a spend is assembled and proven -
<a href="/actions-and-proofs">Actions, Phases &amp; Proofs</a>.</p>
`

export default html
