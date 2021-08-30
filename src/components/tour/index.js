import { useStaticQuery, graphql } from "gatsby"
import {
  createOrderedShowList,
} from "./tour"
import {
  prop,
  complement,
} from "ramda"
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
  const shows = createOrderedShowList(data.markdownRemark.htmlAst)

  return (
    <View
      title={data.markdownRemark.frontmatter.title}
      upcomingShows={shows.filter(prop("isUpcoming"))}
      passedShows={shows.filter(complement(prop("isUpcoming")))}
    />
  )
}
