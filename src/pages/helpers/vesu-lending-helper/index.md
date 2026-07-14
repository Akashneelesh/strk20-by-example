---
title: Vesu Lending Helper
version: 0.14.2
description: Earn lending yield privately - the official reference helper for Vesu ERC-4626 vaults
keywords: [vesu, lending, vault, erc4626, vtoken, helper, yield]
---

The Vesu lending helper connects the privacy pool to
[Vesu](https://vesu.xyz), a permissionless lending protocol whose pools are
ERC-4626 / SNIP-22 tokenized vaults: deposit underlying assets, receive vToken
shares; withdraw by burning shares. This is the reference anonymizer contract used in
the official Starknet Privacy docs. It is a reference example: review and
adoption of the Vesu route remain with the app team, and the integration is
in progress.

Two operations, one entry point:

- **Deposit** - underlying → vToken shares. `out_token` is the vault; the helper
  approves it, calls `deposit`, and the minted shares land in an open note.
- **Withdraw** - vToken shares → underlying. `in_token` is the vault; the helper
  calls `withdraw` and the returned assets land in an open note.

Your position in the vault is itself a private note holding vTokens - the yield
accrues to a position nobody can attribute to you.

```cairo
{{{VesuLendingHelper}}}
```

## Things to notice

- **Same skeleton as the swap helper** - validate inputs, snapshot the output
  balance, do the external call, credit the delta. Only the middle differs.
- **Stateless and permissionless** - unlike the escrow, this helper has no
  storage and no pinned pool address; it trusts only the balance delta and
  approves whoever called it. Anything it holds mid-transaction is pulled by the
  pool in the same transaction.
- **Directionality via token roles** - deposit puts the vault at `out_token`,
  withdraw puts it at `in_token`. One signature covers both directions.
- **Shares return value ignored** - the ERC-4626 return value is discarded in
  favor of the measured delta, for the same reasons as the swap helper.
- **`u256` assets, `u128` note amounts** - vault math is `u256`; the credited
  delta must fit a note's 128-bit amount or the call reverts.

Next: the Escrow helper - a stateful helper with its own commitment scheme.
