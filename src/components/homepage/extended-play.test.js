import ExtendedPlay from "./extended-play"
import React from "react"
import { createContainer } from "./../../test-utils"
import { pipe, tap } from "ramda"
import { render, fireEvent } from "@testing-library/react"

describe("components :: extended-play", () => {
  it("should have the order modal hidden by default", () => pipe(
    props => <ExtendedPlay {...props} />,
    createContainer,
    render,
    ({ container }) => expect(container.querySelector(".order-modal")).toBeNull()
  )({
    // no test props
  }))

  it("should open the order modal when the order button is pressed", () => pipe(
    props => <ExtendedPlay {...props} />,
    createContainer,
    render,
    tap(({ container }) => fireEvent.click(
      container.querySelector(".extended-play button")
    )),
    ({ container }) => expect(container.querySelectorAll(".order-modal")).toHaveLength(1),
  )({
    // no test props
  }))

  it("should close the modal when the overlay is clicked", () => pipe(
    props => <ExtendedPlay {...props} />,
    createContainer,
    render,
    tap(({ container }) => fireEvent.click(
      container.querySelector(".extended-play button")
    )),
    tap(({ container }) => fireEvent.click(
      container.querySelector(".order-modal")
    )),
    ({ container }) => expect(container.querySelector(".order-modal")).toBeNull(),
  )({
    // no test props
  }))

  it("should close the modal when the close button is pressed", () => pipe(
    props => <ExtendedPlay {...props} />,
    createContainer,
    render,
    tap(({ container }) => fireEvent.click(
      container.querySelector(".extended-play button")
    )),
    tap(({ container }) => fireEvent.click(
      container.querySelector(".order-modal button")
    )),
    ({ container }) => expect(container.querySelector(".order-modal")).toBeNull(),
  )({
    // no test props
  }))
})
