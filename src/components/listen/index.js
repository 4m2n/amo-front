import Listen from "./listen"
import { connect } from "react-redux"
import { next } from "./../../state/soundcloud/widget"
import { compose } from "ramda"

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  currentSound: state.soundcloud.currentSound,
  isPlaying: state.soundcloud.isPlaying,
  trackList: state.soundcloud.trackList,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  next: compose(dispatch, next),
})

// Listen :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listen)
