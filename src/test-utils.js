import {
  createStore,
} from "redux"
import {
  Provider,
} from "react-redux"
import {
  TestScheduler,
} from "rxjs/testing"
import rootReducer from "./state"
import React from "react"

// done :: () -> _
export const done = () => undefined

// createContainer :: React.Component -> React.Component
export const createContainer = component =>
  <Provider store={createStore(rootReducer)}>
    {component}
  </Provider>

// createTestScheduler :: () -> TestScheduler
export const createTestScheduler = () => new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected)
})
