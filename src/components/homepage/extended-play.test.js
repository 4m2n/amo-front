import { render, fireEvent } from "@testing-library/react"
import { pipe, prop, tap } from "ramda"
import React from "react"
import ExtendedPlay from "./extended-play"

describe("components :: extended-play", () => {
  it("should have the order modal hidden by default", () => pipe(
    render,
    prop("container"),
    container => container.querySelector(".order-modal"),
    modal => expect(modal).toBeNull(),
  )(<ExtendedPlay />))

  it("should open the order modal when the order button is pressed", () => pipe(
    render,
    tap(render => fireEvent.click(
      render.container.querySelector(".extended-play button")
    )),
    prop("container"),
    container => container.querySelectorAll(".order-modal"),
    modal => expect(modal).toHaveLength(1),
  )(<ExtendedPlay />))

  it("should close the modal when the overlay is clicked", () => pipe(
    render,
    tap(render => fireEvent.click(
      render.container.querySelector(".extended-play button")
    )),
    tap(render => fireEvent.click(
      render.container.querySelector(".order-modal")
    )),
    prop("container"),
    container => container.querySelector(".order-modal"),
    modal => expect(modal).toBeNull(),
  )(<ExtendedPlay />))

  it("should close the modal when the close button is pressed", () => pipe(
    render,
    tap(render => fireEvent.click(
      render.container.querySelector(".extended-play button")
    )),
    tap(render => fireEvent.click(
      render.container.querySelector(".order-modal button")
    )),
    prop("container"),
    container => container.querySelector(".order-modal"),
    modal => expect(modal).toBeNull(),
  )(<ExtendedPlay />))
})
