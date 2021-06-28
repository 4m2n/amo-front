import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import parser from "./../../parser/parser"

// Biography :: () -> React.Component
export default function Biography() {
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
    <section className="biography">
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      {parser(data.markdownRemark.htmlAst)}
    </section>
  )
}
