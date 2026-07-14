---
title: Escrow
version: 0.14.2
description: A deferred-delivery escrow anonymizer contract - send privately to someone who has not registered yet
keywords: [escrow, helper, commitment, claim, secret, privacy_invoke]
---

The escrow helper solves a real problem: you cannot privately transfer to someone
who has not registered a viewing key yet. Instead, you **escrow the funds behind a
secret**, share the secret off-chain (a claim link), and the recipient claims the
funds into their own note once they are registered.

It is a two-operation state machine driven by `privacy_invoke`:

- **Deposit** - the pool withdraws tokens to the escrow, which stores a
  `CommitmentEntry` keyed by `poseidon(ESCROW_COMMITMENT_TAG, secret)`. Only the
  hash goes on-chain; the secret never does.
- **Claim** - the claimer proves knowledge of the secret preimage. The escrow marks
  the commitment claimed, approves the pool to pull the tokens, and returns an
  `OpenNoteDeposit` instructing the pool to credit the claimer's open note.

```cairo
{{{Escrow}}}
```

## Things to notice

- **Access control** - `privacy_invoke` asserts the caller is the privacy pool.
  Nobody can drive the escrow directly.
- **Commitment hash is domain-separated** - `ESCROW_COMMITMENT_TAG` prevents the
  secret's hash from colliding with hashes used elsewhere.
- **Deposit returns an empty span** - tokens stay parked in the escrow, so there is
  nothing for the pool to credit yet.
- **Claim recomputes the hash from the secret** - the passed-in `commitment_hash`
  parameter is ignored on claim; only the preimage matters.
- **Double-claim protection** - the `claimed` flag flips exactly once; a second
  claim hits `ALREADY_CLAIMED`.

The SDK pairs with this contract through `computeCommitmentHash`,
`generateEscrowSecret`, `buildDepositInvoke`, `buildClaimInvoke` and
`buildClaimUrl` - see [Build Privacy Wallets](/sdk/getting-started) for the TypeScript side of this flow.
