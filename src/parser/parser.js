import React from "react"
import { mapIndexed } from "./../utils"
import {
  always,
  append,
  both,
  cond,
  equals,
  flip,
  identity,
  ifElse,
  last,
  o,
  pipe,
  prop,
  uncurryN,
} from "ramda"

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

// getChildren :: Object -> Any
export const getChildren = prop("children")

// getLastChildren :: AstNode -> AstNode
export const getLastChildren = o(last, getChildren)

// hasChildren :: Node -> Boolean
export const hasChildren = both(
  node => node.children !== undefined,
  node => node.children.length > 0,
)

// getDeepestChildOrIdentity :: Node -> Node
export const getDeepestChildOrIdentity = ifElse(
  hasChildren,
  node => getDeepestChildOrIdentity(getLastChildren(node)),
  identity,
)

// curriedGetTdNodeText :: [String] -> TdNode -> [String]
export const curriedGetTdNodeText = acc => pipe(
  getDeepestChildOrIdentity,
  ifElse(
    isText,
    createText,
    always(undefined),
  ),
  flip(append)(acc),
)

// getTdNodeText :: ([String], TdNode) -> [String]
export const getTdNodeText = uncurryN(2, curriedGetTdNodeText)
