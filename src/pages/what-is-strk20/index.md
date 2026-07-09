---
title: What is STRK20?
version: 0.14.2
description: An introduction to Starknet Privacy - confidential token transfers on a public chain
keywords: [strk20, privacy, pool, starknet, introduction, overview]
---

The foundation for all privacy on Starknet: the layer everything above reads from
and writes to. STRK20 brings shielded balances, private transfers, and private
DeFi to any ERC-20 on Starknet, built on the wallets and liquidity that already
exist rather than a separate ecosystem.

### How it works at a high level

- **Note-based pool: not a mixer.** Shielding deposits an ERC-20 into the pool,
  where the balance is held as an encrypted note (a UTXO). Private transfers
  spend existing notes and generate new ones.
- **Registration first:** An account must register in the pool (set a viewing key)
  before it can hold or receive private balances; both sender and recipient must
  be registered before private transfers between them. Wallets handle registration
  on first use, and channel setup between counterparties is automatic after that.
- **Onchain proof verification:** Every private transaction carries a
  zero-knowledge (STARK) proof confirming the spent notes exist, belong to the
  spender, haven't been double-spent, and that value is conserved. Starknet
  verifies the proof in-protocol before updating the pool's state.
- **Hidden vs. visible:** Inside the pool, the sender, receiver, amounts, token
  type, and which notes were spent are all private. What stays visible: deposit
  and withdrawal amounts (the public ERC-20 legs), that someone is interacting
  with the pool, and timing. A Paymaster can decouple the submitter's address
  from the transaction.
- **Shielding:** Users shield assets when they want privacy and unshield them when
  transparency is required, moving value between public and confidential states on
  the same underlying token.

## The lifecycle: public → private → public

1. **Deposit** - move public ERC-20 tokens into the pool. The deposit itself is
   visible on-chain (depositor and amount), but the resulting note is encrypted.
2. **Private transfers** - transfer value inside the pool by spending notes and
   creating new ones. Nobody watching the chain can tell who paid whom, or how much.
3. **Withdraw** - move tokens back out of the pool to a public address.

## What makes it different

- **Native to Starknet** - no separate chain or bridge. It runs as a contract on
  Starknet and composes with existing accounts and DeFi.
- **Variable amounts, reusable notes** - unlike fixed-denomination mixers, notes
  carry arbitrary amounts and change is handled automatically.
- **Scalable discovery** - recipients find their incoming funds by scanning only
  their own channels, so cost scales with your activity, not total pool volume.
- **Built-in compliance** - at registration every user encrypts their private
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

Each of these has its own page in the Concepts section - read them in order and
you will have the full mental model.

## Who this site is for

- **Private dapp developers** integrating with existing wallets - see the
  Starknet Wallet API section.
- **Core dapp builders** writing private DeFi integrations - see the Helper
  Contracts section.
- **Wallet builders** implementing privacy flows directly - see Build Privacy
  Wallets.
- **Anyone** who wants to understand how private payments work on Starknet - start
  with the Concepts pages.
