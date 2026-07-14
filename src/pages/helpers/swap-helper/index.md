---
title: Swap Helper
version: 0.14.2
description: A DEX swap anonymizer contract - trade privately through any AMM using the balance-delta idiom
keywords: [swap, amm, dex, helper, balance delta, privacy_invoke]
---

The swap helper lets pool funds trade on an external AMM without revealing the
trader. The pool withdraws the input token to the helper, the helper swaps on the
AMM, and the received amount is credited to an open note - all in one atomic
transaction.

This is the canonical template for **any** DEX integration: only the AMM call in
the middle changes.

```cairo
{{{SwapHelper}}}
```

The demo AMM it targets is a trivial 1:1 exchange - in production this would be
Ekubo, JediSwap, or any other DEX:

```cairo
{{{MockAmm}}}
```

## The balance-delta idiom

The helper never trusts the AMM's return value. It measures what actually
arrived:

```
balance_before = out_token.balance_of(helper)
...swap...
out_amount = out_token.balance_of(helper) - balance_before
```

This is what makes the pattern universal - it works with any external protocol
regardless of its interface, handles fees-on-transfer, and guarantees the open
note is credited with exactly the tokens the pool can actually pull.

## Things to notice

- **The AMM is pinned at deployment** - `amm_address` and the swap `selector` are
  constructor parameters, so a deployed helper is a fixed, auditable route.
- **`call_contract_syscall`** invokes the AMM generically; an AMM revert
  propagates and aborts the whole pool transaction - no funds move.
- **Overflow guard** - the delta is `u256 → u128` converted with an explicit
  error; a manipulated token cannot smuggle an oversized amount into a note.
- **`ZERO_OUT_AMOUNT` guard** - a swap that returns nothing reverts instead of
  crediting an empty note.
- **The trader is never on-chain** - observers see pool → helper → AMM → helper.
  The open note's owner stays hidden.

Next: the same pattern pointed at a real lending protocol - the Vesu helper.
