import {
  addIndex,
  equals,
  filter,
  flatten,
  head,
  identity,
  ifElse,
  join,
  map,
  o,
  pipe,
  prop,findIndex,
  propEq,
  test,
  uncurryN,
  uniq,
} from "ramda"
import {
  Observable,
} from "rxjs"

// mapIndexed :: Function -> List -> List
export const mapIndexed = addIndex(map)

// findIndexByTitle :: (String, [Sound]) -> Number
export const findIndexByTitle = uncurryN(2, title => pipe(
  findIndex(propEq("title", title)),
  index => index < 0 ? 0 : index,
))

// Date utils //////////////////////////////////////////////////////////////////

// getCurrentYear :: () -> Number
export const getCurrentYear = () => (new Date()).getFullYear()

// toFrenchDate :: Date -> String
export const toFrenchDate = date => date.toLocaleDateString(
  "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
)

// isoToFrenchDate :: String -> String
export const isoToFrenchDate = pipe(
  isoDate => new Date(isoDate),
  toFrenchDate,
)

// File utils //////////////////////////////////////////////////////////////////

// createSourceList :: ([Number], [String]) -> String -> [String]
export const createSourceList = (sizes, formats) => pipe(
  filename => map(
    format => map(
      size => `${filename}_${size}.${format}`,
      sizes,
    ),
    formats,
  ),
  flatten,
)

// createSrcSet :: String -> [String] -> String
export const createSrcSet = (format = "") => pipe(
  filter(test(new RegExp(`\\.${format}$`))),
  uniq,
  map(source => [
    source,
    source.match(/_(\d+)/),
  ]),
  map(([source, matches]) => `${source} ${matches[1]}w`),
  join(", "),
)

// getDefaultSrc :: [String] -> String
export const getDefaultSrc = pipe(
  filter(test(new RegExp("\\.jpg|png$"))),
  head,
)

// generateImageSizesFromList :: [Number] -> String
export const generateImageSizesFromList = pipe(
  map(size => `(max-width: ${size}px) ${size}px`),
  join(", "),
)

// Redux utils /////////////////////////////////////////////////////////////////

// ofType :: ActionType -> Action -> Boolan
export const ofType = actionType => o(equals(actionType), prop("type"))

// handleErrorOrContinue :: (ActionType, * -> Action) -> Action -> Action
export const handleErrorOrContinue = (errorType, actionCreator) => ifElse(
  ofType(errorType),
  identity,
  actionCreator,
)

// Observable utils ////////////////////////////////////////////////////////////

// fromWidget :: (Widget, String) -> Observable
export const fromWidget = (widget, event) => new Observable(subscriber => {
  try {
    widget.bind(
      event,
      () => subscriber.next(event),
    )
  } catch (err) {
    subscriber.error(err)
  }
})
