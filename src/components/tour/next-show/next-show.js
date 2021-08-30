import React from "react"
import { toFrenchDate } from "../../../utils"
import BookShowButton from "./../book-show-button"
import "./next-show.scss"

// NextShow :: Props -> React.Component
const NextShow = ({
  nextShow = null,
}) =>
  nextShow
    ? <div className="next-show">
        <h1 className="title">Prochain concert</h1>
        <div className="wrapper">
          <aside className="date-and-time">
            <p className="day">
              {toFrenchDate(nextShow.date, { day: "numeric" })}
            </p>
            <p className="month">
              {toFrenchDate(nextShow.date, { month: "long" })}
            </p>
            <p className="time">
              à {nextShow.time}
            </p>
          </aside>

          <h2>{nextShow.city}</h2>
          <p>{nextShow.address}</p>
          <BookShowButton show={nextShow} />
        </div>
      </div>
    : null

export default NextShow
