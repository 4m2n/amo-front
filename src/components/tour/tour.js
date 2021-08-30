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

const showAttributes = ["city", "address", "time", "date", "price", "buy"]

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
  show => ({
    ...show,
    isUpcoming: show.date >= new Date(),
  }),
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
  sortBy(prop("date")),
)

// createShowTable :: [Show] -> React.Component
export const createShowTable = shows =>
  <>
    {/* Desktop & tablet layout */}
    <table className="show-table is-hidden-mobile">
      <thead>
        <tr>
          <th>Date</th>
          <th>Heure</th>
          <th>Ville</th>
          <th>Adresse</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {shows.map((show, idx) =>
          <tr
            key={`desktop-show-${idx}`}
            className="show"
          >
            <td>{toFrenchDate(show.date)}</td>
            <td>{show.time}</td>
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
    {shows.map((show, idx) =>
      <MobileShow
        key={`mobile-show-${idx}`}
        className="is-hidden-tablet"
        show={show}
      />
    )}
  </>

// Tour :: Props -> React.Component
export const Tour = ({
  title = "",
  upcomingShows = [],
  passedShows = [],
}) =>
  <section className="tour">
    <div className="container">
      <h1 className="title">
        {title} à venir
      </h1>

      {upcomingShows.length > 0
        ? createShowTable(upcomingShows)
        :<p>Il n'y à aucun concert prévu à ce jour !</p>
      }

      <h1 className="title">
        {title} passés
      </h1>

      {passedShows.length > 0
        ? createShowTable(passedShows)
        :<p>Il n'y à pas encore de concerts passés à afficher !</p>
      }
    </div>
  </section>

export default Tour
