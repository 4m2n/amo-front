import Widget from "./widget"
import { connect } from "react-redux"
import { compose, pipe } from "ramda"
import {
  componentDidMount,
  componentWillUnmount,
} from "react-functional-lifecycle"
import {
  clean,
  initialize,
  pause,
  play,
} from "./../../../state/soundcloud/widget"

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  error: state.soundcloud.error,
  isLoading: state.soundcloud.isLoading,
  isPlaying: state.soundcloud.isPlaying,
  isReady: state.soundcloud.isReady,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  clean: compose(dispatch, clean),
  initialize: compose(dispatch, initialize),
  pause: compose(dispatch, pause),
  play: compose(dispatch, play),
})

// didMount :: Props -> Action
const didMount = ({ initialize, id }) => initialize(id)

// willUnmount :: Props -> Action
const willUnmount = ({ clean }) => clean()

// lifecycles :: Props -> React.Component
const lifecycles = pipe(
  componentDidMount(didMount),
  componentWillUnmount(willUnmount),
)(Widget)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
