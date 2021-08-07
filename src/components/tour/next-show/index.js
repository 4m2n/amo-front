import React from "react"
import { useStaticQuery } from "gatsby"
import { query } from "./../index"
import { createShowList } from "./../tour"
import {
  head,
  pipe,
} from "ramda"
import View from "./next-show"

// NextShow :: () -> React.Component
export default function NextShow() {
  const data = useStaticQuery(query)

  const nextShow = pipe(
    createShowList,
    head,
  )(data.markdownRemark.htmlAst)

  return (
    <View nextShow={nextShow} />
  )
}
