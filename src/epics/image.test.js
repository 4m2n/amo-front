import {
  ERROR,
  SOURCES_RECEIVED,
  register,
} from "./../state/image/image"
import {
  loadImageSources,
} from "./image"
import {
  of,
} from "rxjs"

describe("epics :: image :: loadImageSources", () => {
  it("dispatches the SOURCES_RECEIVED action", done => {
    const action$ = of(register(
      "my-image",
      "test_image",
      [640, 1024],
      ["jpg", "webp"],
    ))
    const deps = {
      importImage: filename => Promise.resolve({
        default: `/static/hash-${filename}`,
      }),
    }

    loadImageSources(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(SOURCES_RECEIVED)
        expect(action.id).toBe("my-image")
        expect(action.sources).toEqual([
          "/static/hash-test_image_640.jpg",
          "/static/hash-test_image_1024.jpg",
          "/static/hash-test_image_640.webp",
          "/static/hash-test_image_1024.webp",
        ])
        done()
      })
      .catch(error => { console.error(error); done() })
  }, 1000)

  it("dispatches the ERROR action when an error occures", done => {
    const action$ = of(register(
      "my-image",
      "test_image",
      [640, 1024],
      ["jpg", "webp"],
    ))
    const deps = {
      importImage: () => Promise.reject("error"),
    }

    loadImageSources(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(ERROR)
        expect(action.message).toBe("\"error\"")
        done()
      })
      .catch(error => { console.error(error); done() })
  }, 1000)
})
