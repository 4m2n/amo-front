import React, { useState } from "react"
import { Link } from "gatsby"
import Contact from "./../contact/contact"
import "./menu.scss"

// Menu :: Props -> React.Component
const Menu = () => {
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
          <li>
            <Link to="/concerts">Concerts</Link>
            <div className="separator"></div>
          </li>
          <li>
            <Link to="/ecouter">Écouter</Link>
            <div className="separator"></div>
          </li>
          <li>
            <Link to="/pro">Pro</Link>
            <div className="separator"></div>
          </li>
          <li>
            <Link to="/boutique">Boutique</Link>
            <div className="separator"></div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu
