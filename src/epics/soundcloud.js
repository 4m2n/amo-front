import {
  combineEpics,
  ofType,
} from "redux-observable"
import {
  CLEAN,
  ERROR,
  INITIALIZE,
  INITIALIZED,
  PAUSE,
  PLAY,
  currentSoundReceived,
  error,
  initialized,
  paused,
  playing,
  waitForSoundcloudEvent,
} from "./../state/soundcloud/widget"
import {
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  catchError,
  takeUntil,
} from "rxjs/operators"
import {
  complement,
  compose,
  isNil,
  o,
  pick,
  toString,
} from "ramda"
import {
  of,
  from,
} from "rxjs"
import {
  fromWidget,
  handleErrorOrContinue,
} from "./../utils"

// @see https://developers.soundcloud.com/docs/api/html5-widget#events
//
// soundcloud emitted events
const SC_READY = "ready"
const SC_PLAY = "play"
const SC_PAUSE = "pause"

// pickScAttributes :: Object -> Object
const pickScAttributes = pick([
  "title",
  "description",
  "artwork_url",
  "permalink_url",
  "created_at",
])

// initializeSoundcloudWidgetEpic :: Epic -> Observable Action Error
export const initializeSoundcloudWidgetEpic = (action$, _, { soundcloud, soundcloudWidget }) =>
  action$.pipe(
    ofType(INITIALIZE),
    filter(() => soundcloud() !== null),
    map(({ id }) => soundcloud().Widget(id)),
    switchMap(widget => fromWidget(widget, SC_READY).pipe(
      takeUntil(action$.pipe(ofType(CLEAN))),
      tap(() => soundcloudWidget().setInstance(widget)),
      catchError(compose(of, error, toString)),
    )),
    map(handleErrorOrContinue(ERROR, initialized)),
  )

// waitForSoundcloudToBePlayingEpic :: Epic ->Observable Action Error
export const waitForSoundcloudToBePlayingEpic = (action$, _, { soundcloudWidget }) =>
  action$.pipe(
    ofType(INITIALIZED),
    map(() => soundcloudWidget().getInstance()),
    filter(complement(isNil)),
    switchMap(widget => fromWidget(widget, SC_PLAY).pipe(
      takeUntil(action$.pipe(ofType(CLEAN))),
      catchError(compose(of, error, toString)),
    )),
    map(handleErrorOrContinue(ERROR, playing)),
  )

// waitForSoundcloudToBePausedEpic :: Epic ->Observable Action Error
export const waitForSoundcloudToBePausedEpic = (action$, _, { soundcloudWidget }) =>
  action$.pipe(
    ofType(INITIALIZED),
    map(() => soundcloudWidget().getInstance()),
    filter(complement(isNil)),
    switchMap(widget => fromWidget(widget, SC_PAUSE).pipe(
      takeUntil(action$.pipe(ofType(CLEAN))),
      catchError(compose(of, error, toString)),
    )),
    map(handleErrorOrContinue(ERROR, paused)),
  )

// getCurrentSoundEpic :: Epic -> Observable Action Error,
export const getCurrentSoundEpic = (action$, _, { soundcloudWidget }) =>
  action$.pipe(
    ofType(INITIALIZED),
    map(() => soundcloudWidget().getInstance()),
    filter(complement(isNil)),
    mergeMap(widget => from(new Promise(resolve => widget.getCurrentSound(resolve))).pipe(
      catchError(compose(of, error, toString)),
    )),
    map(handleErrorOrContinue(
      ERROR,
      o(currentSoundReceived, pickScAttributes)
    )),
  )

// playEpic :: Epic -> Observable Action Error
export const playEpic = (action$, _, { soundcloudWidget }) =>
  action$.pipe(
    ofType(PLAY),
    map(() => soundcloudWidget().getInstance()),
    filter(complement(isNil)),
    mergeMap(widget => of(widget).pipe(
      tap(widget => widget.play()),
      catchError(compose(of, error, toString)),
    )),
    map(handleErrorOrContinue(ERROR, waitForSoundcloudEvent)),
  )

// pauseEpic :: Epic -> Observable Action Error
export const pauseEpic = (action$, _, { soundcloudWidget }) =>
  action$.pipe(
    ofType(PAUSE),
    map(() => soundcloudWidget().getInstance()),
    filter(complement(isNil)),
    mergeMap(widget => of(widget).pipe(
      tap(widget => widget.pause()),
      catchError(compose(of, error, toString)),
    )),
    map(handleErrorOrContinue(ERROR, waitForSoundcloudEvent)),
  )

export default combineEpics(
  getCurrentSoundEpic,
  initializeSoundcloudWidgetEpic,
  pauseEpic,
  playEpic,
  waitForSoundcloudToBePausedEpic,
  waitForSoundcloudToBePlayingEpic,
)
