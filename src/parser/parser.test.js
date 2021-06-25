import React from "react"
import renderer from "react-test-renderer"
import { pipe, tap } from "ramda"
import * as parser from "./parser"
import { done } from "./../utils"

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
})
