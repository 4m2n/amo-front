import React from "react"
import parse from "./../../parser/parser"
const Lyrics = ({
  title,
  htmlAst,
}) =>
  <div className="lyrics">
    <h1 className="title">- {title} -</h1>
    <div className="text">
      {parse(htmlAst)}
    </div>
  </div>

export default Lyrics
