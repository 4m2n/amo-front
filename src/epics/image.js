import {
  combineEpics,
  ofType,
} from "redux-observable"
import {
  createSourceList,
  handleErrorOrContinue,
} from "./../utils"
import {
  ERROR,
  REGISTER,
  error,
  sourcesReceived,
} from "./../state/image/image"
import {
  catchError,
  map,
  mergeMap,
} from "rxjs/operators"
import {
  apply,
  compose,
  map as rmap,
  prop,
  toString,
} from "ramda"
import {
  from,
  of,
} from "rxjs"

// loadImageSources :: Epic -> Observable Action Error
export const loadImageSources = (action$, _, { importImage }) =>
  action$.pipe(
    ofType(REGISTER),
    map(({ id, filename, sizes, formats }) => [
      id,
      createSourceList(sizes, formats)(filename),
    ]),
    mergeMap(([ id, sources ]) => from(
      Promise.all(sources.map(importImage)
    )).pipe(
      map(rmap(prop("default"))),
      map(importedImages => [
        id,
        importedImages,
      ]),
      catchError(compose(of, error(id), toString)),
    )),
    map(handleErrorOrContinue(
      ERROR,
      apply(sourcesReceived),
    )),
  )

export default combineEpics(
  loadImageSources,
)
