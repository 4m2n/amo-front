import * as utils from "./utils"
import { pipe } from "ramda"

beforeEach(() => {
  const DATE_TO_USE = new Date("1990")
  global.Date = jest.fn(() => DATE_TO_USE)
})

describe("utils", () =>  {
  it("determines the current year", () => pipe(
    result => expect(result).toBe(1990),
  )(utils.getCurrentYear()))

  it("ends a test pipe", () => pipe(
    result => expect(result).toBeUndefined(),
  )(utils.done()))

  it("creates a source list", () => {
    expect(
      utils.createSourceList([320, 760], ["webp", "jpg"])("my-file")
    ).toEqual([
      "my-file_320.webp",
      "my-file_760.webp",
      "my-file_320.jpg",
      "my-file_760.jpg",
    ])
  })

  it("creates a srcset string from a source list", () => {
    const sources = [
      "my-file_320-hash.webp",
      "my-file_760-hash.webp",
      "my-file_320-hash.jpg",
      "my-file_760-hash.jpg",
    ]

    expect(
      utils.createSrcSet("webp", [320, 760])(sources)
    ).toBe(
      "my-file_320-hash.webp 320w, my-file_760-hash.webp 760w"
    )

    expect(
      utils.createSrcSet("jpg", [320, 760])(sources)
    ).toBe(
      "my-file_320-hash.jpg 320w, my-file_760-hash.jpg 760w"
    )
  })

  it("gets the default source from a source list", () => {
    const sources = [
      "my-file_320.webp",
      "my-file_760.webp",
      "my-file_320.jpg",
      "my-file_760.jpg",
    ]

    expect(
      utils.getDefaultSrc(sources)
    ).toBe(
      "my-file_320.jpg"
    )
  })

  it("generates image sizes from a size list", () => {
    expect(
      utils.generateImageSizesFromList([720, 360])
    ).toBe(
      "(max-width: 720px) 720px, (max-width: 360px) 360px"
    )
  })
})

