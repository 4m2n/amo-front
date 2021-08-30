import React from "react"
import {
  fromPairs,
  map,
  o,
  pipe,
  reduce,
  zip,
  sortBy,
  prop,
  reverse,
} from "ramda"
import {
  getChildren,
  getLastChildren,
  getTdNodeText,
} from "./../../parser/parser"
import {
  toFrenchDate,
} from "./../../utils"
import "./tour.scss"
import MobileShow from "./mobile-show"
import BookShowButton from "./book-show-button"

const showAttributes = ["city", "address", "date", "price", "buy"]

// formatShow :: Show -> Show
export const formatShow = pipe(
  show => [
    show,
    show.date.split("/"),
  ],
  ([show, [dd, mm, yyyy]]) => ({
    ...show,
    date: new Date(`${mm}/${dd}/${yyyy}`),
  }),
)

// sortShowsByDateDesc :: [Show] -> [Show]
export const sortShowsByDateDesc = pipe(
  sortBy(prop("date")),
  reverse,
)

// createShowList :: HtmlAst -> [Show]
export const createShowList = pipe(
  getLastChildren,                                // from root to table node
  getLastChildren,                                // from table to tbody node
  getChildren,                                    // get tr elements as a list
  map(pipe(
    o(reduce(getTdNodeText, []), getChildren),    // extract cell node as texts
    zip(showAttributes),
    fromPairs,
    formatShow,                                   // create show objects
  )),
)

// createOrderedShowList :: HtmlAst -> [Show]
export const createOrderedShowList = pipe(
  createShowList,
  sortShowsByDateDesc,
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
          {createOrderedShowList(htmlAst).map((show, idx) =>
            <tr key={`desktop-show-${idx}`}>
              <td>{toFrenchDate(show.date)}</td>
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
          key={`mobile-show-${idx}`}
          className="is-hidden-tablet"
          show={show}
        />
      )}
    </div>
  </section>

export default Tour
