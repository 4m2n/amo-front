import { combineEpics } from "redux-observable"
import images from "./image"
import soundcloud from "./soundcloud"

// Epic :: (Observable Action, Observable State, Object<Dependencies>) -> Observable Action Error
export default combineEpics(
  images,
  soundcloud,
)
