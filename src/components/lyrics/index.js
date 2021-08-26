import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import View from "./lyrics"
import {
  map,
  path,
  pipe,
  prop,
} from "ramda"

// getTrackByTitle :: GraphQL.Data -> Sound
export const getTrackByTitle = title => pipe(
  path(["allMarkdownRemark", "edges"]),
  map(pipe(
    prop("node"),
    ({ htmlAst, frontmatter }) => ({
      title: frontmatter.title,
      htmlAst,
    })
  )),
  tracks => tracks.find(track => track.title === title),
)

// Lyrics :: Props -> React.Component
export default function Lyrics({ title }) {
  const data = useStaticQuery(graphql`
    query LyricsQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            id: {regex: "/^track-/"}
          }
        }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            htmlAst
          }
        }
      }
    }
  `)

  const track = getTrackByTitle(title)(data)

  return (track
    ? <View {...track} />
    : null
  )
}
