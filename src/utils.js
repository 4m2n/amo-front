import {
  addIndex,
  filter,
  flatten,
  head,
  join,
  map,
  test,
  pipe,
  uniq,
} from "ramda"

// getCurrentYear :: () -> Number
export const getCurrentYear = () => (new Date()).getFullYear()

// done :: () -> _
export const done = () => undefined

// mapIndexed :: Function -> List -> List
export const mapIndexed = addIndex(map)

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
