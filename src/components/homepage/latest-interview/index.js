import LatestInterview from "./latest-interview"
import { connect } from "react-redux"

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  isReady: state.soundcloud.isReady,
  interview: state.soundcloud.currentSound,
})

// LatestInterview :: Props -> React.Component
export default connect(
  mapStateToProps,
)(LatestInterview)
