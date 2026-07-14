# STRK20 by Example

Learn Starknet Privacy (STRK20) with simple examples - privacy pools, notes and
nullifiers, viewing keys, the Starknet Wallet API, Cairo anonymizer contracts, and wallet-builder SDK flows.

Built in the mold of [Solidity by Example](https://solidity-by-example.org)
(forked architecture, MIT licensed). Content is sourced from the
[starknet-privacy](https://github.com/starkware-libs/starknet-privacy) monorepo and the
[official Starknet Privacy docs](https://docs.starknet.io/build/starknet-privacy/overview).

### License

[MIT License](LICENSE)

### Development

```shell
npm i
npm start
```

### Production

```shell
npm run build
# Preview production
npm run preview
```

### Authoring a page

1. Cairo pages only: put the contract in `contracts/src/<category>/<slug>/Name.cairo`,
   then mirror it into `src/pages/`:

   ```shell
   npm run copy:contracts
   ```

2. Write `src/pages/<category>/<slug>/index.md` with frontmatter
   (`title`, `version`, `description`, `keywords`, optional `githubLink`).
   Inject Cairo sources with Mustache placeholders inside a fence:

   ````markdown
   ```cairo
   {{{Name}}}
   ```
   ````

   TypeScript SDK snippets are written inline in ```typescript fences
   (do NOT add `.ts` files under `src/pages/` - they'd be typechecked by the app build).

3. Generate the page (or all pages):

   ```shell
   npm run page src/pages/<category>/<slug>
   npm run pages:all
   ```

4. Register the route in `src/nav.ts` (correct array + position = prev/next order),
   then regenerate routes and the search index:

   ```shell
   npm run routes
   npm run search
   ```

5. `npm start` and eyeball it.

Note: after ANY change to `scripts/md-to-react.ts`, the mustache templates, or
highlighting, run `npm run pages:all` - highlighted HTML is frozen into
`index.html.ts` at generation time.

### Contracts

`contracts/` holds the Cairo sources for example pages, adapted from the
starknet-privacy monorepo. They are not compiled standalone in v1 - see
`contracts/README.md`.
