---
title: What is STRK20?
version: 0.14.2
description: An introduction to Starknet Privacy - confidential token transfers on a public chain
keywords: [strk20, privacy, pool, starknet, introduction, overview]
---

Starknet Privacy (STRK20) is a protocol for **confidential ERC-20 transfers on Starknet**.
Sender, receiver and amounts are hidden from outside observers, while validity is
enforced by client-side zero-knowledge proofs.

Funds move through a **privacy pool** — a smart contract that holds pooled ERC-20
tokens and tracks ownership with encrypted, UTXO-style records called **notes**.

## The lifecycle: public → private → public

1. **Deposit** — move public ERC-20 tokens into the pool. The deposit itself is
   visible on-chain (depositor and amount), but the resulting note is encrypted.
2. **Private transfers** — transfer value inside the pool by spending notes and
   creating new ones. Nobody watching the chain can tell who paid whom, or how much.
3. **Withdraw** — move tokens back out of the pool to a public address.

## What makes it different

- **Native to Starknet** — no separate chain or bridge. It runs as a contract on
  Starknet and composes with existing accounts and DeFi.
- **Variable amounts, reusable notes** — unlike fixed-denomination mixers, notes
  carry arbitrary amounts and change is handled automatically.
- **Scalable discovery** — recipients find their incoming funds by scanning only
  their own channels, so cost scales with your activity, not total pool volume.
- **Built-in compliance** — at registration every user encrypts their private
  viewing key to an auditor's public key, enabling selective disclosure under
  lawful process while preserving everyone else's privacy.

## The building blocks

| Concept         | What it is                                                           |
| --------------- | -------------------------------------------------------------------- |
| Note            | Immutable record of ownership of an amount of a token                |
| Nullifier       | One-time value revealed when spending a note (prevents double-spend) |
| Viewing key     | Keypair used to encrypt/decrypt note data and derive nullifiers      |
| Channel         | Unidirectional sender → recipient lane where notes are stored        |
| Helper contract | Small adapter that lets pool funds interact with external DeFi       |

Each of these has its own page in the Concepts section — read them in order and
you will have the full mental model.

## Who this site is for

- **App developers** integrating private transfers with the TypeScript SDK — see
  the SDK section.
- **Cairo developers** writing helper contracts (escrow, swaps, lending) that the
  pool invokes atomically — see the Helper Contracts section.
- **Anyone** who wants to understand how private payments work on Starknet — start
  with the Concepts pages.
