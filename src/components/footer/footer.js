import React from "react"
import { getCurrentYear } from "./../../utils"
import "./footer.scss"

// Footer :: Props -> React.Component
export default () =>
  <footer>
    <p>
    © {getCurrentYear()} Amaury Langlois / Photographies © Mathieu Lagraula
    </p>
    <p>
      Coded with ❤ by&nbsp;
      <a href="https://github.com/jaljo" target="_blank" rel="noreferrer">
        jaljo
      </a>
    </p>
  </footer>
