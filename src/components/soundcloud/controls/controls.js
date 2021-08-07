import React from "react"
import Loader from "./../../loader"
import "./controls.scss"

// hasPreviousTrack :: (Number, Number) -> Boolean
export const hasPreviousTrack = (currentSoundIndex, trackListLength) =>
  trackListLength > 1 &&
  currentSoundIndex > 0

// hasNextTrack :: (Number, Number) -> Boolean
export const hasNextTrack = (currentSoundIndex, trackListLength) =>
  trackListLength > 1 &&
  currentSoundIndex < trackListLength - 1

// Controls :: Props -> React.Component
const Controls = ({
  canSkipTracks = false,
  currentSoundIndex = 0,
  isLoading = false,
  isPlaying = false,
  isReady = false,
  next = () => {},
  pause = () => {},
  play = () => {},
  trackListLength = 0,
}) =>
  <div className={`soundcloud-controls ${isReady ? "ready" : ""}`}>
    {isReady
      ? <>
          {canSkipTracks &&
            <button
              className={`previous ${hasPreviousTrack(currentSoundIndex, trackListLength) ? "" : "is-masked"}`}
              disabled={isLoading}
              onClick={() => next(currentSoundIndex - 1)}
              title="Morceau précédent"
            >
              <span className="im">u</span>
            </button>
          }
          {isPlaying
            ? <button
                className="pause"
                disabled={isLoading}
                onClick={() => pause()}
                title="Mettre en pause"
              >
                <span className="im">y</span>
              </button>
            : <button
                className="play"
                disabled={isLoading}
                onClick={() => play()}
                title="Lire le morceau"
              >
                <span className="im">t</span>
              </button>
          }
          {canSkipTracks &&
            <button
              className={`next ${hasNextTrack(currentSoundIndex, trackListLength) ? "" : "is-masked"}`}
              disabled={isLoading}
              onClick={() => next(currentSoundIndex + 1)}
              title="Morceau suivant"
            >
              <span className="im">i</span>
            </button>
          }
        </>
      : <Loader />
    }
  </div>

export default Controls
