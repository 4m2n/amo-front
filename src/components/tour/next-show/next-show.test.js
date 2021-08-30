import NextShow from "./next-show.js"
import { pipe, prop } from "ramda"
import { render } from "@testing-library/react"
import React from "react"

describe("components :: tour :: next-show", () => {
  it("renders nothing if the newt show has already been played", () => pipe(
    props => NextShow(props),
    container => expect(container).toBeNull(),
  )({
    nextShow: null,
  }))

  it("renders the upcoming show wrapped with a title", () => pipe(
    props => <NextShow {...props} />,
    render,
    prop("container"),
    container => container.querySelector("h1"),
    title => expect(title.textContent).toBe("Prochain concert"),
  )({
    nextShow: {
      date: new Date("12/06/2121"),
    },
  }))
})
