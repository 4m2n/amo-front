import React from "react"
import Menu from "./../menu/menu"
import Footer from "./../footer/footer"
import "./layout.scss"

// Layout :: Props ->  React.Component
const Layout = ({
  path,
  children,
}) =>
  <main>
    <Menu path={path} />
    <div className="content">
      {children}
    </div>
    <Footer />
  </main>

export default Layout
