import React from "react"

// BookShowButton :: Props -> React.Component
const BookShowButton = ({
  show = {},
}) => show.buy
  ? <a
      className="btn-teal"
      href={show.buy}
      target="_blank"
      rel="noreferrer"
    >
     {`Réserver (${show.price ? `${show.price}€` : "Entrée gratuite"})`}
    </a>
  : <p>
      {show.price
        ? `Vente sur place (${show.price}€)`
        : "Entrée gratuite"
      }
    </p>

export default BookShowButton
