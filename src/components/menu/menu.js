import React, { useState } from "react"
import { Link } from "gatsby"
import Contact from "./../contact/contact"
import "./menu.scss"
import {
  equals,
  last,
  pipe,
  split,
} from "ramda"

// isPage :: String -> String -> Boolean
export const isPage = page => pipe(
  split("/"),
  last,
  equals(page),
)

// MenuItem :: Props :: React.Component
export const MenuItem = ({
  page = "",
  path = "",
}) =>
  <li className={isPage(page)(path) ? "active" : ""} >
    <Link to={`/${page}`}>
      {page}
    </Link>
    <div className="separator"></div>
  </li>

// Menu :: Props -> React.Component
const Menu = ({
  path,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <header>
      <button
        className="menu-burger is-hidden-tablet"
        onClick={() => opened ? setOpened(false) : setOpened(true)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      <p className="logo-amo">
        <Link to="/">AMO</Link>
      </p>

      <Contact
        showSocialNetworks={false}
        className="is-hidden-tablet"
      />

      <nav className={opened ? "opened" : "closed"}>
        <ul>
          <MenuItem page="concerts" path={path} />
          <MenuItem page="ecouter" path={path} />
          <MenuItem page="pro" path={path} />
        </ul>
      </nav>
    </header>
  );
}

export default Menu
