import React from "react"
import SEO from "./SEO"
import Html from "./Html"
import styles from "./Example.module.css"

interface Path {
  title: string
  path: string
}

interface Code {
  fileName: string
  code: string
}

interface Props {
  title: string
  description: string
  version: string
  html: string
  githubLink?: string
  prev: Path | null
  next: Path | null
  codes: Code[]
}

const Example: React.FC<Props> = ({
  title,
  version,
  description,
  githubLink,
  html,
  prev,
  next,
  codes,
}) => {
  return (
    <div className={styles.component}>
      <SEO
        title={`${title} | STRK20 by Example`}
        description={description}
        githubLink={githubLink}
      />
      <div className={styles.content}>
        <h2>{title}</h2>

        {githubLink ? (
          <div className={styles.sourceLink}>
            View the full source in the{" "}
            <a href={githubLink} target="__blank">
              starknet-privacy repo
            </a>
          </div>
        ) : null}

        <Html html={html} />

        <div className={styles.prevNext}>
          {prev && (
            <a href={prev.path}>
              {`< `}
              {prev.title}
            </a>
          )}
          {next && (
            <a href={next.path}>
              {next.title}
              {` >`}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Example
