import React from "react"
import { useStaticQuery } from "gatsby"
import { query } from "./../index"
import { createOrderedShowList } from "./../tour"
import {
  last,
  pipe,
  filter,
} from "ramda"
import View from "./next-show"

// getNextShowFromGraphql :: GraphQLData -> Maybe Show
export const getNextShowFromGraphql = pipe(
  useStaticQuery,
  data => data.markdownRemark.htmlAst,
  createOrderedShowList,
  filter(show => show.date > new Date()),
  last, // only keep last show of the list : its the closest to the current date
)

// NextShow :: () -> React.Component
export default function NextShow() {
  const nextShow = getNextShowFromGraphql(query)

  return (
    <View nextShow={nextShow} />
  )
}
