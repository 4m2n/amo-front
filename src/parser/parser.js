import React from "react"
import { both, cond, equals, o, prop } from "ramda"
import { mapIndexed } from "./../utils"

// createParagraph :: (Element, Number) -> React.component
export const createParagraph = (element, idx) =>
  <p key={`p-${idx}`}>
    {parse(element)}
  </p>

// createText :: (Element, Number) -> String
export const createText = prop("value")

// createBold :: (Element, Number) -> React.Component
export const createBold = (element, idx) =>
  <b key={`b-${idx}`}>
    {parse(element)}
  </b>

// createItalic :: Element -> React.Component
export const createItalic = (element, idx) =>
  <i key={`i-${idx}`}>
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

// createElement :: (Element, Number) -> React.Component
const createElement = cond([
  [isParagraph, createParagraph],
  [isText, createText],
  [isBold, createBold],
  [isItalic, createItalic],
])

// We need to use an indexed map here because each node should have its own key.
//
// parse :: HtmlAst -> React.Component
export const parse = o(mapIndexed(createElement), prop("children"))

export default parse
