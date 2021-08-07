import React from "react"
import {
  fromPairs,
  map,
  o,
  pipe,
  reduce,
  zip,
} from "ramda"
import {
  getChildren,
  getLastChildren,
  getTdNodeText,
} from "./../../parser/parser"
import "./tour.scss"
import MobileShow from "./mobile-show"
import BookShowButton from "./book-show-button"

const showAttributes = ["city", "address", "date", "price", "buy"]

// createShowList :: HtmlAst -> [Show]
export const createShowList = pipe(
  getLastChildren,                                // from root to table node
  getLastChildren,                                // from table to tbody node
  getChildren,                                    // get tr elements as a list
  map(o(reduce(getTdNodeText, []), getChildren)), // extract cell node as texts
  map(zip(showAttributes)),                       // create pairs
  map(fromPairs),                                 // create tour objects
)

// Tour :: Props -> React.Component
export const Tour = ({
  title = "",
  htmlAst = {},
}) =>
  <section className="tour">
    <div className="container">
      <h1 className="title">
        {title}
      </h1>

      {/* Desktop & tablet layout */}
      <table className="show-table is-hidden-mobile">
        <thead>
          <tr>
            <th>Date</th>
            <th>Ville</th>
            <th>Salle</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {createShowList(htmlAst).map((show, idx) =>
            <tr key={`desktop-show-${idx}`}>
              <td>{show.date}</td>
              <td>{show.city}</td>
              <td>{show.address}</td>
              <td>
                <BookShowButton show={show} />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile layout */}
      {createShowList(htmlAst).map((show, idx) =>
        <MobileShow
          show={show}
          idx={idx}
          className="is-hidden-tablet"
        />
      )}
    </div>
  </section>

export default Tour
