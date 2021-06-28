import React from "react"
import { both, cond, equals, map, o, prop } from "ramda"

// createParagraph :: Element -> React.component
export const createParagraph = element =>
  <p>
    {parse(element)}
  </p>

// createText :: Element -> String
export const createText = prop("value")

// createBold :: Element -> React.Component
export const createBold = element =>
  <b>
    {parse(element)}
  </b>

// isElement :: Element -> Boolean
export const isElement = o(equals("element"), prop("type"))

// hasTag :: Element -> String -> Boolean
export const hasTag = tag => o(equals(tag), prop("tagName"))

// isText :: Element -> Boolean
export const isText = o(equals("text"), prop("type"))

// isParagraph :: Element -> Boolean
export const isParagraph = both(isElement, hasTag("p"))

// isBold :: Element -> Boolean
export const isBold = both(isElement, hasTag("strong"))

// createElement :: Element -> React.Component
export const createElement = cond([
  [isParagraph, createParagraph],
  [isText, createText],
  [isBold, createBold],
])

// parse :: HtmlAst -> React.Component
export const parse = o(map(createElement), prop("children"))

export default parse
