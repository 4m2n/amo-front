import { render, fireEvent, waitFor } from "@testing-library/react"
import { pipe, prop, tap } from "ramda"
import React from "react"
import ExtendedPlay from "./extended-play"

describe("components :: extended-play", () => {
  it("should have the order modal hidden by default", async () => {
    const { container } = render(<ExtendedPlay />)

    await waitFor(() => {
      expect(container.querySelector(".order-modal")).toBeNull()
    })
  })

  it("should open the order modal when the order button is pressed", async () => {
    const { container } = render(<ExtendedPlay />)

    fireEvent.click(container.querySelector(".extended-play button"))

    await waitFor(() => {
      expect(container.querySelectorAll(".order-modal")).toHaveLength(1)
    })
  })

  it("should close the modal when the overlay is clicked", async () => {
    const { container } = render(<ExtendedPlay />)

    fireEvent.click(container.querySelector(".extended-play button"))
    fireEvent.click(container.querySelector(".order-modal"))

    await waitFor(() => {
      expect(container.querySelector(".order-modal")).toBeNull()
    })
  })

  it("should close the modal when the close button is pressed", async () => {
    const { container } = render(<ExtendedPlay />)

    fireEvent.click(container.querySelector(".extended-play button"))
    fireEvent.click(container.querySelector(".order-modal button"))

    await waitFor(() => {
      expect(container.querySelector(".order-modal")).toBeNull()
    })
  })
})
