import {
  pipe,
  tap,
} from "ramda"

const logger = store => next => pipe(
  tap(action => console.log("dispatching", action)),
  next,
  tap(() => console.log('next state', store.getState())),
)

export default logger
