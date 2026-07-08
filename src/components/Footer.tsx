import React from "react"
import styles from "./Footer.module.css"

function Footer() {
  return (
    <div className={styles.component}>
      <div className={styles.row}>
        <a href="https://docs.starknet.io/build/starknet-privacy/overview" target="__blank">
          Starknet Privacy docs
        </a>
      </div>
      <div className={styles.row}>
        <a href="https://github.com/starkware-libs/starknet-privacy" target="__blank">
          starknet-privacy source
        </a>
        <div className={styles.bar}>|</div>
        <a href="https://www.starknet.io" target="__blank">
          starknet.io
        </a>
      </div>
    </div>
  )
}

export default Footer
