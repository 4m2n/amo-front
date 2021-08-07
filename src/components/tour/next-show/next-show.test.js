import {
  isUpcomingShow,
  default as NextShow,
} from "./next-show.js"
import { pipe, prop } from "ramda"
import { render } from "@testing-library/react"
import React from "react"

describe("components :: tour :: next-show", () => {
  it("determines that the given show is to be played", () => pipe(
    isUpcomingShow,
    result => expect(result).toBeTruthy(),
  )({
    date: "12/06/2121",
  }))

  it("determines that the given show has already been played", () => pipe(
    isUpcomingShow,
    result => expect(result).toBeFalsy(),
  )({
    date: "12/06/2021",
  }))

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
      date: "12/06/2121",
    },
  }))
})
