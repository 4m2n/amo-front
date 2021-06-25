import React from "react"
import { Link } from "gatsby"
import "./menu.scss"

// Menu :: Props -> React.Component
export default () =>
  <header>
    <p className="logo-amo">
      <Link to="/">AMO</Link>
    </p>
    <nav>
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
