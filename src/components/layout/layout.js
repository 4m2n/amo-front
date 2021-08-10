import React from "react"
import Menu from "./../menu/menu"
import Footer from "./../footer/footer"
import Helmet from "react-helmet"
import icon from "./../../assets/favicon.ico"
import "./layout.scss"

// Layout :: Props ->  React.Component
const Layout = ({
  path,
  children,
}) =>
  <main>
    <Helmet>
      <link rel="icon" type="image/x-icon" href={icon} />
    </Helmet>
    <Menu path={path} />
    <div className="content">
      {children}
    </div>
    <Footer />
  </main>

export default Layout
