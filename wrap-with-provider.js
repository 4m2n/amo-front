import React from "react"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { createEpicMiddleware } from "redux-observable"
import rootReducer from "./src/state"
import rootEpic from "./src/epics"
import soundcloudWidgetRepository from "./src/soundcloud/soundcloud-widget-repository"
import consoleLogger from "./src/logger/console-logger"

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    importImage: src => import(`/src/assets/images/${src}`),
    soundcloud: () => window["SC"] || null,
    soundcloudWidget: () => soundcloudWidgetRepository
  },
})

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(epicMiddleware, consoleLogger),
)

epicMiddleware.run(rootEpic)

const WrapWithProvider = ({ element }) =>
  <Provider store={store}>
    {element}
  </Provider>

export default WrapWithProvider
