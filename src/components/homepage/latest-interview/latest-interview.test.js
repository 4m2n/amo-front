import { render } from "@testing-library/react"
import renderer from "react-test-renderer"
import { pipe, prop, tap } from "ramda"
import { createContainer, done } from "./../../../test-utils"
import LatestInterview from "./latest-interview"
import React from "react"

describe("components :: homepage :: latest-interview", () => {
  it("displays a loader while loading the latest interview", () => pipe(
    props => <LatestInterview {...props} />,
    createContainer,
    render,
    prop("container"),
    container => container.querySelectorAll(".loader"),
    loader => expect(loader).toHaveLength(1),
  )({
    isReady: false,
    interview: null,
  }))

  it("displays the interview content after loading", () => pipe(
    props => <LatestInterview {...props} />,
    createContainer,
    renderer.create,
    component => component.toJSON(),
    tap(tree => expect(tree).toMatchSnapshot()),
    done,
  )({
    isReady: true,
    interview: {
      artwork_url: "my-wonderfull-artwork",
      created_at: "2011-10-05T14:48:00.000Z",
      description: "A test interview",
      permalink_url: "this-links-to-soundcloud",
    },
  }))
})
