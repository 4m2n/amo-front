import React from "react"
import Layout from "./../components/layout/layout"
import Listen from "./../components/listen"
import Seo from "./../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { pipe, map } from "ramda"

// ListenTemplate :: Props -> React.Component
export default function ListenTemplate ({
  path,
}) {
  // GraphQLData
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

  // String
  const description = [
    "Aujourd'hui la musique s'écoute partout, le stream est disponible sur ce",
    "site également, avec les paroles en bonus !",
  ].join(" ")

  // [String]
  const titles = pipe(
    data => data.allMarkdownRemark.edges,
    map(edge => edge.node.frontmatter.title)
  )(data)

  return (
    <Layout path={path} >
      <Seo
        description={description}
        keywords={["écouter", "stream", "musique", ...titles]}
      />
      <Listen
        lyrics={data}
      />
    </Layout>
  )
}
