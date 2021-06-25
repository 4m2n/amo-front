import React from "react"
import Menu from "./../menu/menu"
import Footer from "./../footer/footer"
import "./layout.scss"

// Layout :: () =>  React.Component
export default ({
  children,
}) =>
  <main>
    <Menu />
    <div className="content">
      {children}
    </div>
    <Footer />
  </main>
