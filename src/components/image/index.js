import { connect } from "react-redux"
import { compose, pipe } from "ramda"
import {
  componentDidMount,
  componentWillUnmount,
} from "react-functional-lifecycle"
import {
  register,
  unregister,
} from "./../../state/image/image"
import Image from "./image"

// mapStateToProps :: (State, Props) -> Props
const mapStateToProps = (state, { id }) => ({
  error: state.images[id]
    ? state.images[id].error
    : null
  ,
  sources: state.images[id]
    ? state.images[id].sources
    : []
  ,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  register: compose(dispatch, register),
  unregister: compose(dispatch, unregister),
})

// didMount :: Props -> Action
const didMount = ({ id, filename, sizes, formats, register }) => register(
  id,
  filename,
  sizes,
  formats,
)

// willUnmount :: Props -> Action
const willUnmount = ({ id, unregister }) => unregister(id)

// lifecyles :: React.Component -> React.Component
const lifecyles = pipe(
  componentDidMount(didMount),
  componentWillUnmount(willUnmount),
)(Image)

// Image :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecyles)
