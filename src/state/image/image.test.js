import {
  INITIAL_STATE,
  INSTANCE_INITIAL_STATE,
  default as reducer,
  error,
  register,
  sourcesReceived,
  unregister,
} from "./image"

describe("state :: image :: image", () => {
  it("reduces the REGISTER action", () => {
    expect(
      reducer(INITIAL_STATE, register("my-image"))
    ).toEqual({
      ["my-image"]: INSTANCE_INITIAL_STATE,
    })
  })

  it("reduces the UNREGISTER action", () => {
    const s1 = reducer(INITIAL_STATE, register("my-image"))
    expect(
      reducer(s1, unregister("my-image"))
    ).toEqual(
      {}
    )
  })

  it("reduces the SOURCES_RECEIVED action", () => {
    const s1 = reducer(INITIAL_STATE, register("my-image"))
    expect(
      reducer(s1, sourcesReceived("my-image", [1, 2, 3]))
    ).toEqual({
      ["my-image"]: {
        sources: [1, 2, 3],
        error: null,
      },
    })
  })

  it("reduces the ERROR action", () => {
    const s1 = reducer(INITIAL_STATE, register("my-image"))
    expect(
      reducer(s1, error("my-image")("an error occured"))
    ).toEqual({
      ["my-image"]: {
        sources: [],
        error: "an error occured",
      },
    })
  })

  it("reduces to INITIAL_STATE by default", () => {
    expect(
      reducer(undefined, undefined)
    ).toBe(
      INITIAL_STATE,
    )
  })
})
