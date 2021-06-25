import { render, fireEvent } from "@testing-library/react"
import { pipe, prop, tap } from "ramda"
import Menu from "./menu"
import React from "react"

describe("components :: menu", () => {
  it("should be closed by default", () => pipe(
      render,
      prop("container"),
      container => container.querySelector("nav"),
      prop("className"),
      className => expect(className).toBe("closed"),
  )(<Menu />))

  it("should be opened once the user clicked on the burger menu", () => pipe(
    render,
    tap(render => fireEvent.click(render.container.querySelector(".menu-burger"))),
    prop("container"),
    container => container.querySelector("nav"),
    prop("className"),
    className => expect(className).toBe("opened"),
  )(<Menu />))
})
