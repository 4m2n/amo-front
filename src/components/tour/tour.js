import React from "react"
import { useStaticQuery, graphql } from "gatsby"
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

const showAttributes = ["city", "address", "date", "price", "buy"]

// Tour :: {
//  city    :: String
//  address :: String
//  date    :: String
//  price   :: Number
//  buy     :: String
// }
//
// createShowList :: HtmlAst -> [Show]
export const createShowList = pipe(
  getLastChildren,                                // from root to table node
  getLastChildren,                                // from table to tbody node
  getChildren,                                    // get tr elements as a list
  map(o(reduce(getTdNodeText, []), getChildren)), // extract cell node as texts
  map(zip(showAttributes)),                       // create pairs
  map(fromPairs),                                 // create tour objects
)

// BookShowButton :: Props -> React.Component
export const BookShowButton = ({
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

// Tour :: () -> React.Component
export default function Tour() {
  const data = useStaticQuery(graphql`
    query TourQuery {
      markdownRemark(frontmatter: {id: {eq: "tour"}}) {
        frontmatter {
          title
          id
        }
        htmlAst
      }
    }
  `)

  return (
    <section className="tour">
      <div className="container">
        <h1 className="title">
          {data.markdownRemark.frontmatter.title}
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
            {createShowList(data.markdownRemark.htmlAst).map((show, idx) =>
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
        {createShowList(data.markdownRemark.htmlAst).map((show, idx) =>
          <article className="is-hidden-tablet" key={`mobile-show-${idx}`}>
            <h2>{show.date}- {show.city}</h2>
            <p>{show.address}</p>
            <BookShowButton show={show} />
          </article>
        )}
      </div>
    </section>
  )
}
