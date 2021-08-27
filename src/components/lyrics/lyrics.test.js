import { pipe } from "ramda"
import { render } from "@testing-library/react"
import React from "react"
import { getTrackByTitle, Lyrics } from "./lyrics"

describe("components :: lyrics", () => {
  it("can extract a track by its title from  a markdown collection", () => pipe(
    getTrackByTitle("another-node"),
    result => expect(result).toEqual({
      htmlAst: [1, 2, 3],
      title: "another-node",
    })
  )({
    allMarkdownRemark: {
      edges: [
        {
          node: {
            htmlAst: null,
            frontmatter: {
              title: "my-title",
            },
          },
        },
        {
          node: {
            htmlAst: [1, 2, 3],
            frontmatter: {
              title: "another-node",
            },
          },
        },
      ],
    },
  }))

  it("renders the lyrics correctly", () => pipe(
    props => <Lyrics {...props} />,
    render,
    ({ container }) => [
      container.querySelector("h1"),
      container.querySelectorAll("p"),
    ],
    ([ title, paragraphs ]) => {
      expect(title.textContent).toBe("- Light my fire - the doors -")
      expect(paragraphs).toHaveLength(1)
      expect(paragraphs[0].textContent).toBe("Common baby light my fire !")
    }
  )({
    title: "Light my fire - the doors",
    htmlAst: {
      children: [
        {
          type: "element",
          tagName: "p",
          children: [
            {
              type: "text",
              value: "Common baby light my fire !",
            },
          ],
        },
      ],
    },
  }))
})
