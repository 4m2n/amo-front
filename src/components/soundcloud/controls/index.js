import Controls from "./controls"
import { connect } from "react-redux"
import { compose } from "ramda"
import {
  next,
  pause,
  play,
} from "./../../../state/soundcloud/widget"
import { findIndexByTitle } from "./../../../utils"

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  currentSoundIndex: findIndexByTitle(
    state.soundcloud.currentSound.title,
    state.soundcloud.trackList,
  ),
  isLoading: state.soundcloud.isLoading,
  isPlaying: state.soundcloud.isPlaying,
  isReady: state.soundcloud.isReady,
  trackListLength: state.soundcloud.trackList.length,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  pause: compose(dispatch, pause),
  play: compose(dispatch, play),
  next: compose(dispatch, next),
})

// Controls :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls)
