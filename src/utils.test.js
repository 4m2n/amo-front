import * as utils from "./utils"
import { pipe } from "ramda"

describe("miscellaneous utils", () => {
  it("can find the index of a sound by title in a sound list", () => {
    const sounds = [
      {
        title: "my-title",
      },
      {
        title: "another-title",
      },
      {
        title: "third-title",
      },
    ]

    expect(
      utils.findIndexByTitle("another-title", sounds)
    ).toBe(
      1,
    )
    expect(
      utils.findIndexByTitle("this-title-does-not-exists", sounds)
    ).toBe(
      0,
    )
  })
})

describe("date utils", () =>  {
  it("determines the current year", () => pipe(
    result => expect(result).toBe(1992),
  )(utils.getYear(new Date("1992-09-27"))))

  it("formats a date in french", () => pipe(
    date => new Date(date),
    utils.toFrenchDate,
    result => expect(result).toBe("12 juin 1990"),
  )("1990-06-12T00:05:32.000Z"))

  it("formats an iso date in french", () => pipe(
    utils.isoToFrenchDate,
    result => expect(result).toBe("12 juin 1990"),
  )("1990-06-12T00:05:32.000Z"))
})

describe("file utils", () =>  {
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

describe("redux utils", () =>  {
  it("identifies that an action matches a given type", () => {
    expect(
      utils.ofType("my-type")({ type: "my-type" })
    ).toBeTruthy()

    expect(
      utils.ofType("my-type")({ type: "nein" })
    ).toBeFalsy()
  })

  it("should transparently return the error action when it matches the given type", () => {
    const MY_ERROR = "my-error"
    const next = () => ({ type: "next" })

    expect(
      utils.handleErrorOrContinue(MY_ERROR, next)({ type: "my-error" })
    ).toEqual({
      type: "my-error",
    })
  })

  it("should return the nominal action when the error does not matches the expected type", () => {
    const MY_ERROR = "error-type-a"
    const next = () => ({ type: "next" })

    expect(
      utils.handleErrorOrContinue(MY_ERROR, next)({ type: "error-type-b" })
    ).toEqual({
      type: "next",
    })
  })
})

describe("observable utils", () =>  {
  it("creates an observable that emits from a soundcloud widget binded event", done => {
    const WidgetMock = function () {
      const bindedEvents = {
        play: () => null,
      };

      this.bind = (event, callback) => bindedEvents[event] = callback;

      this.play = () => bindedEvents["play"]();
    };

    const wm = new WidgetMock()

    // creates an observable that will emit every time the "play" event occures
    const fromWidget$ = utils.fromWidget(wm, "play")

    // subscribe to the tested observable and assert on the result
    fromWidget$.subscribe(event => {
      expect(event).toBe("play")
      done()
    })

    // simulates a call to the play method on the widget so the observable will
    // emit and we can assert on the result
    wm.play()
  }, 1000)

  it("errors out as an observable when an error occures", done => {
    const fromWidget$ = utils.fromWidget({}, "play")

    fromWidget$.subscribe(
      () => null,
      error => {
        expect(error.toString()).toBe("TypeError: widget.bind is not a function")
        done()
      }
    )
  }, 1000)
})
