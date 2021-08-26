import { render } from "@testing-library/react"
import { pipe, prop } from "ramda"
import React from "react"
import Widget from "./widget"

describe("components :: soundcloud :: widget", () => {
  it("renders an explicit message when an error occured", () => pipe(
    props => <Widget {...props} />,
    render,
    prop("container"),
    container => container.querySelector("p.error"),
    error => expect(error.textContent).toBe(
      "Une erreur est survenue : play() is not a function. Veuillez réessayer."
    ),
  )({
    error: "play() is not a function"
  }))

  it("renders the iframe with the correct url parameter", () => pipe(
    props => <Widget {...props} />,
    render,
    prop("container"),
    container => container.querySelector("iframe"),
    iframe => {
      expect(iframe.id).toBe("my-id")
      expect(iframe.title).toBe("my-id")
      expect(iframe.src).toBe("https://w.soundcloud.com/player/?url=my-url")
    },
  )({
    url: "my-url",
    id: "my-id",
  }))
})
