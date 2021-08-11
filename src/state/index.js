import { combineReducers } from "redux"
import widget from "./soundcloud/widget"
import images from "./image/image"

// RootReducer :: (State, Action *) -> State
export default combineReducers({
  soundcloud: widget,
  images,
})
