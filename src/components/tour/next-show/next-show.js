import React from "react"
import MobileShow from "./../mobile-show"

// NextShow :: Props -> React.Component
const NextShow = ({
  nextShow = null,
}) =>
  nextShow
    ? <div className="next-show">
        <h1 className="title">Prochain concert</h1>
        <MobileShow show={nextShow} />
      </div>
    : null

export default NextShow
