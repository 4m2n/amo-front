import React from "react"
import parse from "./../../parser/parser"
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
export const Lyrics = ({
  title,
  htmlAst,
}) =>
  <div className="lyrics">
    <h1 className="title">- {title} -</h1>
    <div className="text">
      {parse(htmlAst)}
    </div>
  </div>

export default pipe(
  ({ title, data }) => getTrackByTitle(title)(data),
  track => track
    ? <Lyrics {...track} />
    : null
  ,
)
