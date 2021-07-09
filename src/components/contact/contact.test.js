import { render } from "@testing-library/react"
import { pipe, prop } from "ramda"
import Contact from "./contact"
import React from "react"

describe("components :: contact", () => {
  it("should show social network links by default", () => pipe(
    render,
    prop("container"),
    container => container.querySelectorAll(".social-networks a"),
    networks => expect(networks).toHaveLength(3),
  )(<Contact />))

  it("could hide social network links", () => pipe(
    render,
    prop("container"),
    container => container.querySelector(".social-networks"),
    networks => expect(networks).toBeNull(),
  )(<Contact showSocialNetworks={false} />))
})
