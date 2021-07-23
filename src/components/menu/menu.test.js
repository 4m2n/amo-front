import React from "react"
import { render, fireEvent } from "@testing-library/react"
import renderer from "react-test-renderer"
import { pipe, prop, tap } from "ramda"
import { done } from "./../../utils"
import {
  default as Menu,
  MenuItem,
  isPage,
} from "./menu"

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

  it("should have an active menu item when the page matches the current path", () => pipe(
    renderer.create,
    component => component.toJSON(),
    tap(tree => expect(tree).toMatchSnapshot()),
    done,
  )(<MenuItem page="concerts" path="my/wonderfull/path/concerts" />))

  it("should have an inactive menu item when the page doesn't matches the current path", () => pipe(
    renderer.create,
    component => component.toJSON(),
    tap(tree => expect(tree).toMatchSnapshot()),
    done,
  )(<MenuItem page="biographie" path="my/wonderfull/path/concerts" />))

  it("determines if the current page matches a path", () => {
    expect(
      isPage("concerts")("my/wonderfull/path/concerts")
    ).toBeTruthy()

    expect(
      isPage("billets")("my/wonderfull/path/concerts")
    ).toBeFalsy()
  })
})
