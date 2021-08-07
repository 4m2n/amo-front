import {
  INITIAL_STATE,
  allSoundsReceived,
  clean,
  currentSoundReceived,
  default as reducer,
  error,
  initialize,
  initialized,
  next,
  pause,
  paused,
  play,
  playing,
} from "./widget"

describe("state :: soundcloud :: widget", () => {
  it("reduces the INITIALIZE action", () => {
    expect(
      reducer(INITIAL_STATE, initialize()),
    ).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
    })
  })

  it("reduces the INITIALIZED action", () => {
    const s1 = reducer(INITIAL_STATE, initialize())

    expect(
      reducer(s1, initialized()),
    ).toEqual({
      ...s1,
      isReady: true,
      isLoading: false,
    })
  })

  it("reduces the CURRENT_SOUND_RECEIVED action", () => {
    expect(
      reducer(INITIAL_STATE, currentSoundReceived("my-sound"))
    ).toEqual({
      ...INITIAL_STATE,
      currentSound: "my-sound",
    })
  })

  it("reduces the ALL_SOUND_RECEIVED action", () => {
    expect(
      reducer(INITIAL_STATE, allSoundsReceived([1,2,3]))
    ).toEqual({
      ...INITIAL_STATE,
      trackList: [1, 2, 3],
      currentSound: 1,
    })

    expect(
      reducer(INITIAL_STATE, allSoundsReceived([]))
    ).toEqual({
      ...INITIAL_STATE,
      trackList: [],
      currentSound: {},
    })
  })

  it("reduces the PLAY action", () => {
    const s1 = reducer(INITIAL_STATE, error("an error"))

    expect(
      reducer(s1, play())
    ).toEqual({
      ...s1,
      isLoading: true,
      error: null,
    })
  })

  it("reduces the PLAYING action", () => {
    const s1 = reducer(INITIAL_STATE, play())

    expect(
      reducer(s1, playing())
    ).toEqual({
      ...s1,
      isLoading: false,
      isPlaying: true,
    })
  })

  it("reduces the PAUSE action", () => {
    const s1 = reducer(INITIAL_STATE, error("an error"))

    expect(
      reducer(s1, pause())
    ).toEqual({
      ...s1,
      isLoading: true,
      error: null,
    })
  })

  it("reduces the PAUSED action", () => {
    const s1 = reducer(INITIAL_STATE, pause())

    expect(
      reducer(s1, paused())
    ).toEqual({
      ...s1,
      isLoading: false,
      isPlaying: false,
    })
  })

  it("reduces the NEXT_TRACK action", () => {
    expect(
      reducer(INITIAL_STATE, next(12))
    ).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
    })
  })

  it("reduces the ERROR action", () => {
    const s1 = reducer(INITIAL_STATE, play())

    expect(
      reducer(s1, error("oops"))
    ).toEqual({
      ...s1,
      isLoading: false,
      error: "oops",
    })
  })

  it("reduces the CLEAN action", () => {
    const s1 = reducer(INITIAL_STATE, initialized())

    expect(
      reducer(s1, clean()),
    ).toEqual(
      INITIAL_STATE,
    )
  })

  it("reduces to initial state by default", () => {
    expect(
      reducer(undefined, undefined),
    ).toEqual(
      INITIAL_STATE,
    )
  })
})
