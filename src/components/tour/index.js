import { useStaticQuery, graphql } from "gatsby"
import View from "./tour"
import React from "react"

export const query = graphql`
    query TourQuery {
      markdownRemark(frontmatter: {id: {eq: "tour"}}) {
        frontmatter {
          title
          id
        }
        htmlAst
      }
    }
  `

// Tour :: () -> React.Component
export default function Tour() {
  const data = useStaticQuery(query)

  return (
    <View
      title={data.markdownRemark.frontmatter.title}
      htmlAst={data.markdownRemark.htmlAst}
    />
  )
}
