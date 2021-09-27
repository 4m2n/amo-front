import React from "react"
import { getYear } from "./../../utils"
import "./footer.scss"

// Footer :: Props -> React.Component
const Footer = () =>
  <footer className="container">
    <p>
      © {getYear(new Date())} Amaury Langlois
      <span className="is-hidden-mobile">/</span>
    </p>
    <p>
      Photographies © Mathieu Lagraula
      <span className="is-hidden-mobile">/</span>
    </p>
    <p>
      Coded with ❤ by&nbsp;
      <a href="https://github.com/jaljo" target="_blank" rel="noreferrer">
        jaljo
      </a>
    </p>
  </footer>

export default Footer
