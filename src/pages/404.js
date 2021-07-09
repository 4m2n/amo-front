import React from "react"
import Layout from "./../components/layout/layout"
import { Link } from "gatsby"
import "./404.scss"

// NotFoundPage :: () -> React.Component
const NotFoundPage = () =>
  <Layout>
    <section className="not-found">
      <div className="wrapper">
        <h1>404</h1>
        <p>Cette page n'existe plus.. ou pas encore !</p>
        <Link className="btn-teal" to="/">Revenir à la page d'accueil</Link>
      </div>
    </section>
  </Layout>

export default NotFoundPage
