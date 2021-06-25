import * as utils from "./utils"
import { pipe } from "ramda"

beforeEach(() => {
  const DATE_TO_USE = new Date("1990")
  global.Date = jest.fn(() => DATE_TO_USE)
})

describe("utils", () =>  {
  it("determines the current year", () => pipe(
    result => expect(result).toBe(1990),
  )(utils.getCurrentYear()))

  it("ends a test pipe", () => pipe(
    result => expect(result).toBeUndefined(),
  )(utils.done()))
})

