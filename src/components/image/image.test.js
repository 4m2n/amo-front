
import React from "react"
import { render, screen } from "@testing-library/react"
import Image from "./image"

describe("components :: image", () => {
  it("renders a picture element with a webp source", done => {
    render(<Image filename="AMO_bkg" />)

    screen.findByTestId("source")
      .then(source => {
        expect(source.srcset).toBe("test-file-stub_720.webp 720w")
        done()
      })
      .catch(error => { console.error(error); done() })
  }, 1000)

  it("renders a picture element with an image fallback", done => {
    render(<Image filename="AMO_bkg" />)

    screen.findByTestId("img")
      .then(source => {
        expect(source.srcset).toBe("test-file-stub_720.jpg 720w")
        expect(source.src).toMatch("test-file-stub_720.jpg")
        done()
      })
      .catch(error => { console.error(error); done() })
  }, 1000)
})
