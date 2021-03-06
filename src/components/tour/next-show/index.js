import React from "react"
import { useStaticQuery } from "gatsby"
import { query } from "./../index"
import { createOrderedShowList } from "./../tour"
import {
  head,
  pipe,
  filter,
  prop,
} from "ramda"
import View from "./next-show"

// getNextShowFromGraphql :: GraphQLData -> Maybe Show
export const getNextShowFromGraphql = pipe(
  useStaticQuery,
  data => data.markdownRemark.htmlAst,
  createOrderedShowList,
  filter(prop("isUpcoming")),
  head,
)

// NextShow :: () -> React.Component
export default function NextShow() {
  const nextShow = getNextShowFromGraphql(query)

  return (
    <View nextShow={nextShow} />
  )
}
