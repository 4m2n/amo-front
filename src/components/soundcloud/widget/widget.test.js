import { render } from "@testing-library/react"
import { pipe, prop } from "ramda"
import React from "react"
import Widget from "./widget"

describe("components :: soundcloud :: widget", () => {
  it("hides control buttons when the widget is not ready", () => pipe(
    props => <Widget {...props} />,
    render,
    prop("container"),
    container => container.querySelectorAll(".controls button"),
    controls => expect(controls).toHaveLength(0),
  )({
    isReady: false,
  }))

  it("displays the play button when ready and not already playing", () => pipe(
    props => <Widget {...props} />,
    render,
    prop("container"),
    container => container.querySelector(".controls button"),
    controls => expect(controls.title).toBe("Lire le morceau"),
  )({
    isReady: true,
    isPlaying: false,
  }))

  it("displays the pause button when ready and currently playing", () => pipe(
    props => <Widget {...props} />,
    render,
    prop("container"),
    container => container.querySelector(".controls button"),
    controls => expect(controls.title).toBe("Mettre en pause"),
  )({
    isReady: true,
    isPlaying: true,
  }))

  it("deactivates the buttons when the player is loading (because actions on the player are async", () => pipe(
    props => <Widget {...props} />,
    render,
    prop("container"),
    container => container.querySelector(".controls button"),
    controls => expect(controls.disabled).toBeTruthy(),
  )({
    isReady: true,
    isPlaying: true,
    isLoading: true,
  }))

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
