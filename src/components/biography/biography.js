import React from "react"
import "./biography.scss"
import parse from "./../../parser/parser"

// Biography :: Props -> React.Component
const Biography = ({
  bioIsVisible = false,
  setBioIsVisible = () => {},
  data = {},
}) =>
  <section className="biography container">
    <h1>{data.markdownRemark.frontmatter.title}</h1>

    <article className={bioIsVisible ? "is-expanded" : "is-collapsed"}>
      {parse(data.markdownRemark.htmlAst)}
    </article>

    <button
      className="expand-bio"
      onClick={() => bioIsVisible ? setBioIsVisible(false) : setBioIsVisible(true)}
    >
      > {bioIsVisible ? "Refermer" : "Lire la bio complète"}
    </button>
  </section>

export default Biography
