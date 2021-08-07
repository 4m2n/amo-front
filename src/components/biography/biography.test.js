import { render } from "@testing-library/react"
import { pipe, prop, tap } from "ramda"
import Biography from "./biography"
import React from "react"
import { done } from "./../../test-utils"

describe("components :: biography", () => {
  const data = {
    markdownRemark: {
      frontmatter: {
        title: "foo",
      },
      htmlAst: {
        children: [],
      },
    },
  }

  it("should be collapsed by default", () => pipe(
    render,
    prop("container"),
    container => [
      container.querySelector("article"),
      container.querySelector("button"),
    ],
    tap(([article]) => expect(article.className).toBe("is-collapsed")),
    tap(([_, button]) => expect(button.textContent).toBe("> Lire la bio complète")),
    done,
  )(<Biography data={data} />))

  it("should be expandable", () => pipe(
    render,
    prop("container"),
    container => [
      container.querySelector("article"),
      container.querySelector("button"),
    ],
    tap(([article]) => expect(article.className).toBe("is-expanded")),
    tap(([_, button]) => expect(button.textContent).toBe("> Refermer")),
    done,
  )(<Biography data={data} bioIsVisible={true} />))
})
