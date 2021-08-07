import {
  T,
  cond,
  flip,
} from "ramda"
import {
  ofType,
} from "./../../utils"

// initial state
export const INITIAL_STATE = {
  currentSound: {},
  trackList: [],
  error: null,
  isLoading: false,
  isPlaying: false,
  isReady: false,
}

// action types
export const INITIALIZE = "@amo/state/soundcloud/widget/INITIALIZE"
export const INITIALIZED = "@amo/state/soundcloud/widget/INITIALIZED"
export const CLEAN = "@amo/state/soundcloud/widget/CLEAN"
export const CURRENT_SOUND_RECEIVED = "@amo/state/soundcloud/widget/CURRENT_SOUND_RECEIVED"
export const ALL_SOUNDS_RECEIVED = "@amo/state/soundcloud/widget/ALL_SOUNDS_RECEIVED"
export const PLAY = "@amo/state/soundcloud/widget/PLAY"
export const PLAYING = "@amo/state/soundcloud/widget/PLAYING"
export const PAUSE = "@amo/state/soundcloud/widget/PAUSE"
export const PAUSED = "@amo/state/soundcloud/widget/PAUSED"
export const NEXT_TRACK = "@amo/state/soundcloud/widget/NEXT_TRACK"
export const ERROR = "@amo/state/soundcloud/widget/ERROR"
export const WAIT_FOR_SOUNDCLOUD_EVENT = "@amo/state/soundcloud/widget/WAIT_FOR_SOUNDCLOUD_EVENT"

// initialize :: String -> Action
export const initialize = id => ({
  type: INITIALIZE,
  id,
})

// initialized :: () -> Action
export const initialized = () => ({ type: INITIALIZED })

// clean :: () ->  Action
export const clean = () => ({ type: CLEAN })

// currentSoundReceived :: Sound -> Action
export const currentSoundReceived = sound => ({
  type: CURRENT_SOUND_RECEIVED,
  sound,
})

// allSoundsReceived :: [Sound] -> Action
export const allSoundsReceived = sounds => ({
  type: ALL_SOUNDS_RECEIVED,
  sounds,
})

// play :: () -> Action
export const play = () => ({ type: PLAY })

// playing :: () -> Action
export const playing = () => ({ type: PLAYING })

// pause :: () -> Action
export const pause = () => ({ type: PAUSE })

// paused :: () -> Action
export const paused = () => ({ type: PAUSED })

// next :: Number -> Action
export const next = index => ({
  type: NEXT_TRACK,
  index,
})

// error :: String -> Action
export const error = message => ({
  type: ERROR,
  message,
})

// waitForSoundcloudEvent :: () -> Action
export const waitForSoundcloudEvent = () => ({
  type: WAIT_FOR_SOUNDCLOUD_EVENT,
})

// Widget :: (State, Action *) -> State
export const reducer = cond([
  [ofType(INITIALIZE), (_, state) => ({
    ...state,
    isLoading: true,
  })],

  [ofType(INITIALIZED), (_, state) => ({
    ...state,
    isReady: true,
    isLoading: false,
  })],

  [ofType(CURRENT_SOUND_RECEIVED), ({ sound }, state) => ({
    ...state,
    currentSound: sound,
  })],

  [ofType(ALL_SOUNDS_RECEIVED), ({ sounds }, state) => ({
    ...state,
    // use the first sound of the list as the current sound by default
    currentSound: sounds.length > 0
      ? sounds[0]
      : {}
    ,
    trackList: sounds,
  })],

  [ofType(PLAY), (_, state) => ({
    ...state,
    isLoading: true,
    error: null,
  })],

  [ofType(PLAYING), (_, state) => ({
    ...state,
    isLoading: false,
    isPlaying: true,
  })],

  [ofType(PAUSE), (_, state) => ({
    ...state,
    isLoading: true,
    error: null,
  })],

  [ofType(PAUSED), (_, state) => ({
    ...state,
    isLoading: false,
    isPlaying: false,
  })],

  [ofType(NEXT_TRACK), (_, state) => ({
    ...state,
    isLoading: true,
    error: null,
  })],

  [ofType(ERROR), ({ message }, state) => ({
    ...state,
    isLoading: false,
    error: message,
  })],

  [ofType(CLEAN), () => INITIAL_STATE],

  [T, (_, state) => state || INITIAL_STATE],
])

export default flip(reducer)
