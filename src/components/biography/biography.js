import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import parse from "./../../parser/parser"
import "./biography.scss"

// Biography :: () -> React.Component
export default function Biography() {
  const [bioIsVisible, setBioIsVisible] = useState(false)

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      markdownRemark(frontmatter: {id: {eq: "biography"}}) {
        frontmatter {
          title
          id
        }
        htmlAst
      }
    }
  `)

  return (
    <section className="biography container">
      <h1>{data.markdownRemark.frontmatter.title}</h1>

      <article className={bioIsVisible ? "is-expanded" : "is-collapsed"}>
        {parse(data.markdownRemark.htmlAst)}
      </article>

      <p
        className="expand-bio"
        onClick={() => bioIsVisible ? setBioIsVisible(false) : setBioIsVisible(true)}
      >
        > {bioIsVisible ? "Refermer" : "Lire la bio complète"}
      </p>
    </section>
  )
}
