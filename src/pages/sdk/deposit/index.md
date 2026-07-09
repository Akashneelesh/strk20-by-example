---
title: Deposit
version: 0.14.2
description: Approve the pool, then deposit public ERC-20 tokens into a private note
keywords: [deposit, erc20, approve, surplusTo, note, maturity]
githubLink: https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md
---

A deposit moves public ERC-20 tokens into the pool and mints a private note.
The pool pulls tokens with `transfer_from` while the proof executes, so the
ERC-20 `approve` must already be visible on-chain - it is a **separate
transaction**, submitted and waited on first.

Snippets assume `transfers`, `account` and `provider` from
[Getting Started](/sdk/getting-started).

```typescript
const poolAddress = process.env.POOL_ADDRESS!
const tokenAddress = "0x049d..." // any ERC-20
const amount = 100n

// Transaction 1 - approve the pool to pull tokens.
const approveTx = await account.execute(
  {
    contractAddress: tokenAddress,
    entrypoint: "approve",
    calldata: [poolAddress, amount.toString(), "0"],
  },
  { tip: 0n },
)
await provider.waitForTransaction(approveTx.transaction_hash)

// Transaction 2 - the private deposit.
// Re-fetch provingBlockId AFTER the approve lands, so the proof base
// is not older than the approval.
const provingBlockId = (await provider.getBlockNumber()) - 10

const { callAndProof } = await transfers
  .build({ autoSetup: true })
  .with(tokenAddress, (t) => t.deposit({ amount }))
  .surplusTo(account.address) // the deposited amount becomes my note
  .execute({ provingBlockId })

const proofDetails = callAndProof.proof.proofFacts?.length
  ? { proofFacts: callAndProof.proof.proofFacts, proof: callAndProof.proof.data }
  : {}
const tx = await account.execute(callAndProof.call, { tip: 0n, ...proofDetails })
await provider.waitForTransaction(tx.transaction_hash)
```

## Things to notice

- **Two transactions, never one.** The pool's `apply_actions` entrypoint is
  reentrancy-guarded against sharing a transaction with other calls, so you
  cannot batch `approve` and the deposit into a single `account.execute`.
- The deposit omits `recipient`; `surplusTo(account.address)` directs the
  unassigned amount into a note owned by you. This is the shape that scales
  to deposit-and-transfer on the next page.
- Amounts are **bigint literals** (`100n`) in the token's smallest unit.
- `autoSetup: true` opens your self-channel and the token subchannel if they
  do not exist yet - a first deposit needs both.
- The new note **matures 10 blocks after creation**. Spending it earlier
  produces a proof the contract rejects with `Note not mature`.

Next: [Transfer](/sdk/transfer) a note privately to another account.
