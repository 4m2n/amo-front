import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import View from "./biography"

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
    <View
      bioIsVisible={bioIsVisible}
      setBioIsVisible={setBioIsVisible}
      data={data}
    />
  )
}
