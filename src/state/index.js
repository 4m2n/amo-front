import { combineReducers } from "redux"
import widget from "./soundcloud/widget"

// RootReducer :: (State, Action *) -> State
export default combineReducers({
  soundcloud: widget,
})
