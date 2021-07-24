import React from "react"
import renderer from "react-test-renderer"
import { pipe, tap } from "ramda"
import * as parser from "./parser"
import { done } from "./../test-utils"

describe("parser", () => {
  it("renders a paragraph with a text child", () => pipe(
    renderer.create,
    component => component.toJSON(),
    tap(tree => expect(tree).toMatchSnapshot()),
    done,
  )(parser.createParagraph({
    children: [
      { type: "text", value: "ola" },
    ],
  })))

  it("renders a simple text node", () => pipe(
    text => expect(text).toBe("my text"),
  )(parser.createText({
    type: "text",
    value: "my text",
  })))

  it("renders a bold element with a text child", () => pipe(
    renderer.create,
    component => component.toJSON(),
    tap(tree => expect(tree).toMatchSnapshot()),
    done,
  )(parser.createBold({
    children: [
      { type: "text", value: "is bold" },
    ],
  })))

  it("renders an italic element with a text child", () => pipe(
    renderer.create,
    component => component.toJSON(),
    tap(tree => expect(tree).toMatchSnapshot()),
    done,
  )(parser.createItalic({
    children: [
      { type: "text", value: "is italic" },
    ],
  })))

  it("determines that a node is of type element", () => {
    expect(parser.isElement({ type: "element" })).toBeTruthy()
    expect(parser.isElement({ type: "text" })).toBeFalsy()
  })

  it("determines that a node is of type text", () => {
    expect(parser.isText({ type: "text" })).toBeTruthy()
    expect(parser.isText({ type: "element" })).toBeFalsy()
  })

  it("determines that an element has a tag", () => {
    expect(parser.hasTag("p")({ tagName: "p" })).toBeTruthy()
    expect(parser.hasTag("nav")({ tagName: "p" })).toBeFalsy()
  })

  it("determines that a node is a paragraph", () => {
    expect(parser.isParagraph({ type: "element", tagName: "p" })).toBeTruthy()
    expect(parser.isParagraph({ type: "element", tagName: "b" })).toBeFalsy()
  })

  it("determines that a node is bold", () => {
    expect(parser.isBold({ type: "element", tagName: "strong" })).toBeTruthy()
    expect(parser.isBold({ type: "element", tagName: "i" })).toBeFalsy()
  })

  it("determines that a node is italic", () => {
    expect(parser.isItalic({ type: "element", tagName: "em" })).toBeTruthy()
    expect(parser.isItalic({ type: "element", tagName: "p" })).toBeFalsy()
  })

  it("renders a full html AST to react components", () => pipe(
    renderer.create,
    component => component.toJSON(),
    tap(tree => expect(tree).toMatchSnapshot()),
    done,
  )(parser.createItalic({
    children: [
      {
        type: "element",
        tagName: "p",
        children: [
          {
            type: "text",
            value: "Hello !",
          },
          {
            type: "element",
            tagName: "strong",
            children: [
              {
                type: "text",
                value: "This text is bold, ",
              },
              {
                type: "element",
                tagName: "em",
                children: [
                  {
                    type: "text",
                    value: "but this part also is italic !",
                  },
                ]
              }
            ],
          },
          {
            type: "text",
            value: "So it works.",
          },
        ],
      },
    ],
  })))

  it("get the childrens of a node", () => pipe(
    parser.getChildren,
    result => expect(result).toEqual([1,2,3]),
  )({
    type: "element",
    tagNage: "table",
    children: [1,2,3],
  }))

  it("get the last child of a node", () => pipe(
    parser.getLastChildren,
    result => expect(result).toBe(3),
  )({
    type: "element",
    tagNage: "table",
    children: [1,2,3],
  }))

  it("determines that a node has children", () => pipe(
    parser.hasChildren,
    result => expect(result).toBeTruthy()
  )({
    type: "element",
    tagNage: "table",
    children: [1,2,3],
  }))

  it("determines that a node has no children (empty list)", () => pipe(
    parser.hasChildren,
    result => expect(result).toBeFalsy()
  )({
    type: "element",
    tagNage: "table",
    children: [],
  }))

  it("determines that a node has no children (not a node)", () => pipe(
    parser.hasChildren,
    result => expect(result).toBeFalsy()
  )({
    type: "text",
    value: "ah",
  }))

  it("finds the deepest childless element in an AST", () => pipe(
    parser.getDeepestChildOrIdentity,
    result => expect(result).toEqual({
      type: "text",
      value: "ah",
    })
  )({
    children: [
      {
        children: [
          {
            children: [
              {
                type: "text",
                value: "ah",
              },
            ],
          },
        ],
      },
    ],
  }))

  it("adds the deepest text value of an AST to the accumulator", () => pipe(
    parser.curriedGetTdNodeText(["my", "acc"]),
    newAcc => expect(newAcc).toEqual([
      "my",
      "acc",
      "ah",
    ])
  )({
    children: [
      {
        children: [
          {
            type: "text",
            value: "ah",
          },
        ],
      },
    ],
  }))

  it("adds an undefined value to the accumulator if the deepest child node has no children", () => pipe(
    parser.curriedGetTdNodeText(["my", "acc"]),
    newAcc => expect(newAcc).toEqual([
      "my",
      "acc",
      undefined,
    ])
  )({
    children: [
      {
        children: [],
      },
    ],
  }))
})
