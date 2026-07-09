// metadata
export const version = "0.14.2"
export const title = "Helper Contract Anatomy"
export const description =
  "The privacy_invoke pattern - how the pool calls external contracts and credits open notes"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "privacy_invoke",
  "helper",
  "invoke",
  "opennotedeposit",
  "anonymizing",
  "defi",
]

export const codes = [
  {
    fileName: "EchoHelper.cairo",
    code: "Ly8gQWRhcHRlZCBmcm9tIHN0YXJrbmV0LXByaXZhY3kgcGFja2FnZXMvcHJpdmFjeS9zcmMvdGVzdHMvbW9ja19pbnZva2VfcmV0dXJucy5jYWlybwovLyAoQXBhY2hlLTIuMCwgU3RhcmtXYXJlKS4gVGhlIHNtYWxsZXN0IHBvc3NpYmxlIGhlbHBlciBjb250cmFjdDogaXQgZWNob2VzIHRoZQovLyBkZXBvc2l0IGluc3RydWN0aW9ucyBpdCBpcyBnaXZlbiBiYWNrIHRvIHRoZSBwcml2YWN5IHBvb2wuCnVzZSBwcml2YWN5OjpvYmplY3RzOjpPcGVuTm90ZURlcG9zaXQ7CgojW3N0YXJrbmV0OjppbnRlcmZhY2VdCnB1YiB0cmFpdCBJRWNob0hlbHBlcjxUPiB7CiAgICAvLy8gVGhlIGVudHJ5IHBvaW50IGV2ZXJ5IGhlbHBlciBjb250cmFjdCBtdXN0IGV4cG9zZS4KICAgIC8vLyBUaGUgcHJpdmFjeSBwb29sIGNhbGxzIGl0IHZpYSB0aGUgYElOVk9LRV9TRUxFQ1RPUmAgZHVyaW5nIGBJbnZva2VFeHRlcm5hbGAuCiAgICAvLy8gQ2FsbGRhdGEgYWZ0ZXIgdGhlIHNlbGVjdG9yIGlzIGRlc2VyaWFsaXplZCBpbnRvIHRoaXMgZnVuY3Rpb24ncyBwYXJhbWV0ZXJzOwogICAgLy8vIHRoZSByZXR1cm4gdmFsdWUgdGVsbHMgdGhlIHBvb2wgd2hpY2ggb3BlbiBub3RlcyB0byBjcmVkaXQuCiAgICBmbiBwcml2YWN5X2ludm9rZShyZWYgc2VsZjogVCwgZGVwb3NpdHM6IFNwYW48T3Blbk5vdGVEZXBvc2l0PikgLT4gU3BhbjxPcGVuTm90ZURlcG9zaXQ+Owp9CgojW3N0YXJrbmV0Ojpjb250cmFjdF0KcHViIG1vZCBFY2hvSGVscGVyIHsKICAgIHVzZSBwcml2YWN5OjpvYmplY3RzOjpPcGVuTm90ZURlcG9zaXQ7CiAgICB1c2Ugc3VwZXI6OklFY2hvSGVscGVyOwoKICAgICNbc3RvcmFnZV0KICAgIHN0cnVjdCBTdG9yYWdlIHt9CgogICAgI1tjb25zdHJ1Y3Rvcl0KICAgIGZuIGNvbnN0cnVjdG9yKHJlZiBzZWxmOiBDb250cmFjdFN0YXRlKSB7fQoKICAgICNbYWJpKGVtYmVkX3YwKV0KICAgIHB1YiBpbXBsIEVjaG9IZWxwZXJJbXBsIG9mIElFY2hvSGVscGVyPENvbnRyYWN0U3RhdGU+IHsKICAgICAgICBmbiBwcml2YWN5X2ludm9rZSgKICAgICAgICAgICAgcmVmIHNlbGY6IENvbnRyYWN0U3RhdGUsIGRlcG9zaXRzOiBTcGFuPE9wZW5Ob3RlRGVwb3NpdD4sCiAgICAgICAgKSAtPiBTcGFuPE9wZW5Ob3RlRGVwb3NpdD4gewogICAgICAgICAgICBkZXBvc2l0cwogICAgICAgIH0KICAgIH0KfQo=",
  },
]

const html = `<p>Helper contracts (also called <strong>anonymizing contracts</strong>) are how private funds
interact with the outside world - DEXs, lending vaults, escrows - without
revealing who is behind the interaction.</p>
<p>The pattern is a sandwich, executed atomically in one transaction:</p>
<pre><code>withdraw from pool  →  helper does something  →  deposit result to an open note
</code></pre><ol>
<li>The pool <strong>withdraws</strong> input tokens to the helper (a plain public transfer -
observers see the pool paid the helper, not who initiated it).</li>
<li>The pool calls the helper&#39;s <code>privacy_invoke</code> entry point via the protocol&#39;s
<code>INVOKE_SELECTOR</code>.</li>
<li>The helper does its work, approves the pool to pull the output tokens, and
<strong>returns a <code>Span&lt;OpenNoteDeposit&gt;</code></strong> - instructions telling the pool which
open notes to credit with which tokens and amounts.</li>
</ol>
<p>The output lands in an <strong>open note</strong>: its amount is public (it was measured
on-chain, so it could not be fixed at proof time), but its owner is still hidden.</p>
<h2>The contract every helper must satisfy</h2>
<p>The pool deserializes your calldata into <code>privacy_invoke</code>&#39;s parameters - you are
free to design the signature after the first <code>operation</code>-style arguments - and it
deserializes your return value as <code>Span&lt;OpenNoteDeposit&gt;</code>:</p>
<pre><code class="language-cairo"><span class="hljs-comment">/// From privacy::objects</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">OpenNoteDeposit</span> {
    <span class="hljs-comment">/// The identifier of the open note to deposit to.</span>
    <span class="hljs-keyword">pub</span> note_id: felt252,
    <span class="hljs-comment">/// The ERC20 token contract to deposit.</span>
    <span class="hljs-keyword">pub</span> token: ContractAddress,
    <span class="hljs-comment">/// The amount of tokens to deposit.</span>
    <span class="hljs-keyword">pub</span> amount: <span class="hljs-type">u128</span>,
}
</code></pre><p>Here is the smallest possible helper - it simply echoes the deposit instructions
it is given back to the pool:</p>
<pre><code class="language-cairo"><span class="hljs-comment">// Adapted from starknet-privacy packages/privacy/src/tests/mock_invoke_returns.cairo</span>
<span class="hljs-comment">// (Apache-2.0, StarkWare). The smallest possible helper contract: it echoes the</span>
<span class="hljs-comment">// deposit instructions it is given back to the privacy pool.</span>
<span class="hljs-keyword">use</span> privacy::objects::OpenNoteDeposit;

<span class="hljs-meta">#[starknet::interface]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">trait</span> <span class="hljs-title class_">IEchoHelper</span>&lt;T&gt; {
    <span class="hljs-comment">/// The entry point every helper contract must expose.</span>
    <span class="hljs-comment">/// The privacy pool calls it via the \`INVOKE_SELECTOR\` during \`InvokeExternal\`.</span>
    <span class="hljs-comment">/// Calldata after the selector is deserialized into this function&#x27;s parameters;</span>
    <span class="hljs-comment">/// the return value tells the pool which open notes to credit.</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">privacy_invoke</span>(<span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: T, deposits: Span&lt;OpenNoteDeposit&gt;) <span class="hljs-punctuation">-&gt;</span> Span&lt;OpenNoteDeposit&gt;;
}

<span class="hljs-meta">#[starknet::contract]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">mod</span> EchoHelper {
    <span class="hljs-keyword">use</span> privacy::objects::OpenNoteDeposit;
    <span class="hljs-keyword">use</span> super::IEchoHelper;

    <span class="hljs-meta">#[storage]</span>
    <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Storage</span> {}

    <span class="hljs-meta">#[constructor]</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">constructor</span>(<span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: ContractState) {}

    <span class="hljs-meta">#[abi(embed_v0)]</span>
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">impl</span> <span class="hljs-title class_">EchoHelperImpl</span> of IEchoHelper&lt;ContractState&gt; {
        <span class="hljs-keyword">fn</span> <span class="hljs-title function_">privacy_invoke</span>(
            <span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: ContractState, deposits: Span&lt;OpenNoteDeposit&gt;,
        ) <span class="hljs-punctuation">-&gt;</span> Span&lt;OpenNoteDeposit&gt; {
            deposits
        }
    }
}
</code></pre><p>Useless in production, but it shows the full contract surface: one entry point,
calldata in, <code>Span&lt;OpenNoteDeposit&gt;</code> out.</p>
<h2>Rules of the pattern</h2>
<ul>
<li><strong>Return exactly a <code>Span&lt;OpenNoteDeposit&gt;</code></strong> - returning anything else (or
trailing garbage) makes the pool reject the call.</li>
<li><strong>Approve, don&#39;t transfer</strong> - the helper approves the pool to pull the output;
the pool executes the pull itself when applying the deposits.</li>
<li><strong>An empty span is valid</strong> - it means "credit nothing" (the escrow&#39;s Deposit
operation uses this: funds stay parked in the helper).</li>
<li><strong>Measure output by balance delta</strong> - real helpers record the output token
balance before and after the external call, so the credited amount is exactly
what arrived, whatever the external protocol did.</li>
<li><strong>One <code>invoke</code> per transaction</strong> - the protocol allows at most one external
invoke per pool transaction.</li>
</ul>
<p>The next two pages build real helpers on this skeleton: a DEX swap and a Vesu
lending integration.</p>
`

export default html
