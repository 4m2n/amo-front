import React from "react"
import BookShowButton from "./../book-show-button"

// MobileShow :: Props -> React.Component
const MobileShow = ({
  show = {},
  idx = "unique",
  className= "",
}) =>
  <article className={className} key={`mobile-show-${idx}`}>
    <h2>{show.date}- {show.city}</h2>
    <p>{show.address}</p>
    <BookShowButton show={show} />
  </article>

export default MobileShow
