import React from "react"
import { Link } from "gatsby"

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
        </li>
        <li>
          <Link to="/ecouter">Écouter</Link>
        </li>
        <li>
          <Link to="/pro">Pro</Link>
        </li>
        <li>
          <Link to="/boutique">Boutique</Link>
        </li>
      </ul>
    </nav>
  </header>
