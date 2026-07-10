import React from "react"
import styles from "./Footer.module.css"

function Footer() {
  return (
    <div className={styles.component}>
      <div className={styles.row}>
        <a
          href="https://docs.starknet.io/build/starknet-privacy/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          Starknet Privacy docs
        </a>
        <div className={styles.bar}>|</div>
        <a
          href="https://starkscan.co/privacy-pool"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Pool explorer
        </a>
      </div>
      <div className={styles.row}>
        <a
          href="https://github.com/starkware-libs/starknet-privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          starknet-privacy source
        </a>
        <div className={styles.bar}>|</div>
        <a href="https://www.starknet.io" target="_blank" rel="noopener noreferrer">
          starknet.io
        </a>
      </div>
    </div>
  )
}

export default Footer
