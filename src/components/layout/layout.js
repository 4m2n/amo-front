import React from "react"
import "./layout.scss"

// Layout :: () =>  React.Component
export default ({
  children,
}) =>
  <main>
    <h6>AMO</h6>
    {children}
  </main>
