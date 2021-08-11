
import React from "react"
import Image from "./image"
import { pipe } from "ramda"
import { render } from "@testing-library/react"

describe("components :: image", () => {
  it("renders an error message when an error occured", () => pipe(
    props => <Image {...props} />,
    render,
    ({ container }) => container.querySelector("p"),
    error => expect(error.textContent).toBe("L'image n'a pas pu être chargée : error 1.")
  )({
    error: "error 1",
  }))

  it("renders a picture element with a webp source", () => pipe(
    props => <Image {...props} />,
    render,
    ({ container }) => container.querySelector("source"),
    source => expect(source.srcset).toBe(
      "test-file_720.webp 720w, test-file_384.webp 384w"
    )
  )({
    sources: ["test-file_720.webp", "test-file_384.webp"],
  }))

  it("renders a picture element with an image fallback", () => pipe(
    props => <Image {...props} />,
    render,
    ({ container }) => container.querySelector("img"),
    image => {
      expect(image.srcset).toBe(
        "test-file_720.jpg 720w, test-file_384.jpg 384w"
      )
      expect(image.src).toBe("http://localhost/test-file_720.jpg")
    }
  )({
    sources: ["test-file_720.jpg", "test-file_384.jpg"],
  }))
})
