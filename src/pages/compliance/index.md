---
title: Compliance & Auditing
version: 0.14.2
description: Selective disclosure via an auditor-escrowed viewing key, fund tracing, and known privacy limits
keywords: [compliance, auditor, selective disclosure, tracing, viewing key]
---

STRK20 is private from the public, not from lawful oversight. The mechanism is
a single ciphertext created at registration.

## The escrowed viewing key

When a user registers (`SetViewingKey`), their **private viewing key is
encrypted to the auditor's public key** - using the same ephemeral ECDH scheme
as channels - and stored on-chain. The auditor's public key is set by
governance, and can be a **threshold key**, so no single party can decrypt
unilaterally.

Disclosure is **selective**: the auditor decrypts only the viewing keys of
users subject to a lawful request. Everyone else's transaction graph stays
encrypted - there is no bulk-surveillance mode.

## What a recovered viewing key reveals

With one user's private viewing key, an auditor can:

- open all their **incoming channels** - who paid them, how much, which token
- open all their **outgoing channels** - whom they paid
- decrypt every note amount and match published nullifiers to spent notes
- follow funds **forward** (deposit → notes → further transfers → withdrawals)
  and **backward** (withdrawal → notes → originating deposits)

## What stays visible on-chain for everyone

| On-chain artifact  | Visible to all                                                                  |
| ------------------ | ------------------------------------------------------------------------------- |
| Registration event | That an address joined; its escrowed key blob                                   |
| Deposit            | Depositor address, token and amount (plaintext ERC-20 `transfer_from`)          |
| Withdrawal event   | Recipient address, token and amount; user address also encrypted to the auditor |
| `UseNote`          | A published nullifier (unlinkable without a viewing key)                        |
| Open notes         | Token and filled amount in plaintext                                            |

## Auditors cannot spend

A viewing key is exactly that - a _viewing_ key. Spending requires a valid
account signature verified inside the proof, and the auditor has no
transaction authority. Compromise of the auditor key would break
confidentiality, never custody.

## Known privacy limitations

Honest accounting of what the protocol does not hide:

- **Channel-open linkability** - opening a channel and depositing or
  withdrawing in the same transaction (or in tight succession) can link a
  recipient to their public activity. Spread setup and movement over time.
- **Distinctive patterns** - recognizable amounts, or rapid in-and-out
  sequences between deposit and withdrawal, weaken the anonymity set. This
  affects every privacy pool design.
- **Edges are public by design** - deposits and withdrawals expose addresses
  and amounts; only movement _inside_ the pool is encrypted.

With the full concept set in hand, revisit [What is STRK20?](/what-is-strk20)
to see how the pieces fit together.
