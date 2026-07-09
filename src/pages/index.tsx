import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import SEO from "../components/SEO"
import SearchBar from "../components/SearchBar"
import useDebounce from "../hooks/useDebounce"
import { search, unique } from "../lib/search"
import styles from "./index.module.css"
import { ROUTES, ROUTES_BY_CATEGORY } from "../nav"

const UPDATES = ["2026/07/08 - First release"]

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchResults, setSearchResults] = useState<{
    [key: string]: boolean
  } | null>(null)

  useEffect(() => {
    const q = searchParams.get("q")
    if (q != null && q.length > 0) {
      setQuery(q)
      _search(q, false)
    }
  }, [])

  function _search(query: string, save: boolean) {
    const q = query.trim()

    if (q.length == 0) {
      setSearchResults(null)
      if (save) {
        setSearchParams({ q: "" })
      }
      return
    }

    const words = unique(q.split(" "))
    const pages: { [key: string]: boolean } = {}

    for (const word of words) {
      const res = search(word)
      for (const page of res) {
        pages[page] = true
      }
    }

    setSearchResults(pages)
    if (save) {
      setSearchParams({ q })
    }
  }

  const _searchWithDelay = useDebounce((query: string) => _search(query, true), 500, [])

  function onChangeSearchQuery(query: string) {
    setQuery(query)
    _searchWithDelay(query)
  }

  function renderLinks() {
    if (searchResults) {
      if (Object.keys(searchResults).length == 0) {
        return <div>No results</div>
      }

      return (
        <ul className={styles.list}>
          {ROUTES.filter(({ path }) => searchResults[path]).map(({ path, title }) => (
            <li className={styles.listItem} key={path}>
              <a href={path}>{title}</a>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <>
        {ROUTES_BY_CATEGORY.map(({ routes = [], groups = [], title }, i) => (
          <div key={i}>
            {title && <h3 className={styles.category}>{title}</h3>}

            {routes.length > 0 && (
              <ul className={styles.list}>
                {routes.map(({ path, title }) => (
                  <li className={styles.listItem} key={path}>
                    <a href={path}>{title}</a>
                  </li>
                ))}
              </ul>
            )}

            {groups.map((group) => (
              <div key={group.title}>
                <h4 className={styles.groupTitle}>{group.title}</h4>
                <ul className={styles.list}>
                  {group.routes.map(({ path, title }) => (
                    <li className={styles.listItem} key={path}>
                      <a href={path}>{title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </>
    )
  }

  return (
    <div className={styles.component}>
      <SEO
        title="STRK20 by Example"
        description="Learn Starknet Privacy (STRK20) with simple examples - privacy pools, notes and nullifiers, viewing keys, the Starknet Wallet API, helper contracts, and wallet-builder SDK flows"
      />
      <h1 className={styles.header}>
        <a href="/">STRK20 by Example</a>
      </h1>
      <div className={styles.subHeader}>Starknet Privacy</div>
      <div className={styles.main}>
        <p>
          An introduction to{" "}
          <a href="https://docs.starknet.io/build/starknet-privacy/overview">
            Starknet Privacy
          </a>{" "}
          with simple examples: private transfers on a public chain, the Starknet Wallet
          API, Cairo helper contracts, and wallet-builder SDK flows.
        </p>

        <div className={styles.updates}>
          {UPDATES.map((text, i) => (
            <div key={i}>{text}</div>
          ))}
        </div>

        <div className={styles.search}>
          <SearchBar value={query} onChange={onChangeSearchQuery} />
        </div>

        {renderLinks()}
      </div>
    </div>
  )
}
