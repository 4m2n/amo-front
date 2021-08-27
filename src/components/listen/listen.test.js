import { pipe } from "ramda"
import { render, waitFor } from "@testing-library/react"
import { createContainer } from "./../../test-utils"
import React from "react"
import {
  Track,
  default as Listen,
} from "./listen"

describe("components :: listen :: track", () => {
  it("has the is-selected class when the track is the one beeing selected", () => pipe(
    props => <Track {...props} />,
    render,
    ({ container }) => container.querySelector("button.track"),
    track => expect(track.classList.contains("is-selected")).toBeTruthy()
  )({
    isSelected: true,
  }))

  it("has the is-playing class and icon when the track is the one beeing played", () => pipe(
    props => <Track {...props} />,
    render,
    ({ container }) => container.querySelector("button.track"),
    track => {
      expect(track.classList.contains("is-playing")).toBeTruthy()
      expect(track.querySelectorAll("span.im")).toHaveLength(1)
    }
  )({
    isPlaying: true,
  }))

  it("only contains the title of the track when the track is not playing or selected", () => pipe(
    props => <Track {...props} />,
    render,
    ({ container }) => container.querySelector("button.track"),
    track => {
      expect(track.textContent).toBe("13. My track")
      expect(track.classList.contains("is-playing")).toBeFalsy()
      expect(track.classList.contains("is-selected")).toBeFalsy()
      expect(track.querySelectorAll("span.im")).toHaveLength(0)
    }
  )({
    idx: 12,
    title: "My track",
  }))
})

describe("components :: listen", () => {
  it("displays a loader when the tracklist contains zero tracks", () => pipe(
    props => <Listen {...props} />,
    createContainer,
    render,
    ({ container }) => container.querySelectorAll(".tracklist .loader"),
    loader => expect(loader).toHaveLength(1)
  )({
    trackList: []
  }))

  it("displays a track list", () => pipe(
    props => <Listen {...props} />,
    createContainer,
    render,
    ({ container }) => container.querySelectorAll(".tracklist .tracks .track"),
    tracks => expect(tracks).toHaveLength(3)
  )({
    trackList: [
      { title: "my-track" },
      { title: "another-track" },
      { title: "and-a-third-track" },
    ]
  }))
})
