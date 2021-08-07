import { render } from "@testing-library/react"
import { pipe, prop } from "ramda"
import React from "react"
import {
  default as Controls,
  hasPreviousTrack,
  hasNextTrack,
} from "./controls"

describe("components :: soundcloud :: controls", () => {
  it("hides control buttons when the widget is not ready", () => pipe(
    props => <Controls {...props} />,
    render,
    prop("container"),
    container => container.querySelectorAll(".soundcloud-controls button"),
    controls => expect(controls).toHaveLength(0),
  )({
    isReady: false,
  }))

  it("displays the play button when ready and not already playing", () => pipe(
    props => <Controls {...props} />,
    render,
    prop("container"),
    container => container.querySelector(".soundcloud-controls button"),
    controls => expect(controls.title).toBe("Lire le morceau"),
  )({
    isReady: true,
    isPlaying: false,
  }))

  it("displays the pause button when ready and currently playing", () => pipe(
    props => <Controls {...props} />,
    render,
    prop("container"),
    container => container.querySelector(".soundcloud-controls button"),
    controls => expect(controls.title).toBe("Mettre en pause"),
  )({
    isReady: true,
    isPlaying: true,
  }))

  it("deactivates the buttons when the player is loading (because actions on the player are async)", () => pipe(
    props => <Controls {...props} />,
    render,
    prop("container"),
    container => container.querySelector(".soundcloud-controls button"),
    controls => expect(controls.disabled).toBeTruthy(),
  )({
    isReady: true,
    isPlaying: true,
    isLoading: true,
  }))

  it("does not have next/previous buttons when the canSkipTracks prop is set to false", () => pipe(
    props => <Controls {...props} />,
    render,
    prop("container"),
    container => container.querySelectorAll("button.previous, button.next"),
    controls => expect(controls).toHaveLength(0),
  )({
    isReady: true,
  }))

  it("does have next/previous buttons when the canSkipTracks prop is set to true", () => pipe(
    props => <Controls {...props} />,
    render,
    prop("container"),
    container => container.querySelectorAll("button.previous, button.next"),
    controls => expect(controls).toHaveLength(2),
  )({
    isReady: true,
    canSkipTracks: true,
  }))

  it("should mask the previous button when the there is no previous song", () => pipe(
    props => <Controls {...props} />,
    render,
    prop("container"),
    container => container.querySelector("button.previous"),
    previousBtn => expect(previousBtn.classList.contains("is-masked")).toBeTruthy(),
  )({
    isReady: true,
    canSkipTracks: true,
    trackListLength: 10,
    currentSoundIndex: 0, // <-----
  }))

  it("should mask the next button when the there is no next song", () => pipe(
    props => <Controls {...props} />,
    render,
    prop("container"),
    container => container.querySelector("button.next"),
    nextBtn => expect(nextBtn.classList.contains("is-masked")).toBeTruthy(),
  )({
    isReady: true,
    canSkipTracks: true,
    trackListLength: 10,
    currentSoundIndex: 9, // <-----
  }))

  it("can determine if the current song has previous tracks", () => {
    expect(hasPreviousTrack(0, 12)).toBeFalsy()
    expect(hasPreviousTrack(10, 12)).toBeTruthy()
    expect(hasPreviousTrack(12, 0)).toBeFalsy()
  })

  it("can determine if the current song has next tracks", () => {
    expect(hasNextTrack(11, 12)).toBeFalsy()
    expect(hasNextTrack(5, 12)).toBeTruthy()
    expect(hasNextTrack(12, 0)).toBeFalsy()
  })
})
