import LatestInterview from "./latest-interview"
import { connect } from "react-redux"

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  interview: state.soundcloud.trackList[0] || null,
})

// LatestInterview :: Props -> React.Component
export default connect(
  mapStateToProps,
)(LatestInterview)
