import { ofType } from "./../../utils"
import {
  assoc,
  cond,
  dissoc,
  flip,
  T,
} from "ramda"

// initial state
export const INITIAL_STATE = {}

// instance initial state
export const INSTANCE_INITIAL_STATE = {
  sources: [],
  error: null,
}

// action types
export const REGISTER = "@amo/state/image/image/REGISTER"
export const UNREGISTER = "@amo/state/image/image/UNREGISTER"
export const SOURCES_RECEIVED = "@amo/state/image/image/SOURCES_RECEIVED"
export const ERROR = "@amo/state/image/image/ERROR"

// register :: (String, String, [Number], [String]) -> Action
export const register = (id, filename, sizes, formats) => ({
  type: REGISTER,
  id,
  filename,
  sizes,
  formats,
})

// unregister :: String -> Action
export const unregister = id => ({
  type: UNREGISTER,
  id,
})

// sourcesReceived :: (String, [String]) -> Action
export const sourcesReceived = (id, sources) => ({
  type: SOURCES_RECEIVED,
  id,
  sources,
})

// error :: String -> String -> Action
export const error = id => message => ({
  type: ERROR,
  id,
  message,
})

// Image :: (State, Action *) -> State
const reducer = cond([
  [ofType(REGISTER), ({ id }, state) => assoc(
    id,
    INSTANCE_INITIAL_STATE,
    state,
  )],

  [ofType(UNREGISTER), ({ id }, state) => dissoc(id, state)],

  [ofType(SOURCES_RECEIVED), ({ id, sources }, state) => ({
    ...state,
    [id]: {
      ...state[id],
      sources,
    },
  })],

  [ofType(ERROR), ({ id, message }, state) => ({
    ...state,
    [id]: {
      ...state[id],
      error: message,
    },
  })],

  [T, (_, state) => state || INITIAL_STATE],
])

export default flip(reducer)
