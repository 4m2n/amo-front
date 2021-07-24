import * as utils from "./test-utils"
import {
  pipe,
} from "ramda"

describe("test-utils", () => {
  it("ends a test pipe", () => pipe(
    result => expect(result).toBeUndefined(),
  )(utils.done()))
})
