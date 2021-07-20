import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Tour() {
  const data = useStaticQuery(graphql`
    query TourQuery {
      markdownRemark(frontmatter: {id: {eq: "tour"}}) {
        frontmatter {
          title
          id
        }
        htmlAst
      }
    }
  `)

  return (
    <section className="tour">
      {console.warn(data)}
    </section>
  )
}
