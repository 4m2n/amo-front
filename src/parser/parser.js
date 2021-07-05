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

// createItalic :: Element -> React.Component
export const createItalic = element =>
  <i>
    {parse(element)}
  </i>

// isText :: Element -> Boolean
export const isText = o(equals("text"), prop("type"))

// isElement :: Element -> Boolean
export const isElement = o(equals("element"), prop("type"))

// hasTag :: Element -> String -> Boolean
export const hasTag = tag => o(equals(tag), prop("tagName"))

// isParagraph :: Element -> Boolean
export const isParagraph = both(isElement, hasTag("p"))

// isBold :: Element -> Boolean
export const isBold = both(isElement, hasTag("strong"))

// isItalic :: Element -> Boolean
export const isItalic = both(isElement, hasTag("em"))

// createElement :: Element -> React.Component
const createElement = cond([
  [isParagraph, createParagraph],
  [isText, createText],
  [isBold, createBold],
  [isItalic, createItalic],
])

// parse :: HtmlAst -> React.Component
export const parse = o(map(createElement), prop("children"))

export default parse
