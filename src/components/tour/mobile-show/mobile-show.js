import React from "react"
import BookShowButton from "./../book-show-button"
import { toFrenchDate } from "./../../../utils"

// MobileShow :: Props -> React.Component
const MobileShow = ({
  show = {},
  className= "",
}) =>
  <article className={className}>
    <h2>
      {show.city}
      &nbsp;- {toFrenchDate(show.date)} {show.time && `à ${show.time}`}
    </h2>
    <p>{show.address}</p>
    <BookShowButton show={show} />
  </article>

export default MobileShow
