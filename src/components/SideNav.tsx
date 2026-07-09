import React from "react"
import { useLocation, matchPath } from "react-router-dom"
import styles from "./SideNav.module.css"
import { Route, ROUTES_BY_CATEGORY } from "../nav"

interface Props {
  onClick: (path: string) => void
}

const SideNav: React.FC<Props> = ({ onClick }) => {
  const location = useLocation()

  function _onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) {
    e.preventDefault()
    onClick(path)
  }

  function renderRoutes(routes: Route[], nested = false) {
    return (
      <ul className={nested ? styles.nestedList : styles.list}>
        {routes.map(({ path, title }) => {
          const active = !!matchPath(path, location.pathname)

          return (
            <li className={active ? styles.listItemActive : styles.listItem} key={path}>
              <a className={styles.link} href={path} onClick={(e) => _onClick(e, path)}>
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <h3 className={styles.category}>Concepts</h3>
      {ROUTES_BY_CATEGORY.map(({ routes = [], groups = [], title }, i) => (
        <div key={i}>
          {title && (
            <h3 className={styles.title}>
              {title.split("\n").map((line, j) => (
                <React.Fragment key={j}>
                  {j > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </h3>
          )}

          {routes.length > 0 && renderRoutes(routes)}
          {groups.map((group) => (
            <div className={styles.group} key={group.title}>
              <h4 className={styles.groupTitle}>{group.title}</h4>
              {renderRoutes(group.routes, true)}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default SideNav
