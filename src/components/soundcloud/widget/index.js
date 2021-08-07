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
} from "./../../../state/soundcloud/widget"

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  error: state.soundcloud.error,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  clean: compose(dispatch, clean),
  initialize: compose(dispatch, initialize),
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
