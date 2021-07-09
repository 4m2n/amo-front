import { addIndex, map } from "ramda"

// getCurrentYear :: () -> Number
export const getCurrentYear = () => (new Date()).getFullYear()

// done :: () -> _
export const done = () => undefined

// mapIndexed :: Function -> List -> List
export const mapIndexed = addIndex(map)
