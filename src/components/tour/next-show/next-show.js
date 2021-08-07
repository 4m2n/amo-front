import React from "react"
import MobileShow from "./../mobile-show"
import {
  pipe,
  prop,
  split,
} from "ramda"

// isUpcomingShow :: Show -> Boolean
export const isUpcomingShow = pipe(
  prop("date"),
  split("/"),
  ([ day, month, year ]) => `${month}/${day}/${year}`,
  netxShowDate => new Date(netxShowDate),
  netxShowDate => netxShowDate.getTime() > (new Date()).getTime(),
)

// NextShow :: Props -> React.Component
const NextShow = ({
  nextShow = null,
}) =>
  (nextShow && isUpcomingShow(nextShow))
    ? <div className="next-show">
        <h1 className="title">Prochain concert</h1>
        <MobileShow show={nextShow} />
      </div>
    : null

export default NextShow
