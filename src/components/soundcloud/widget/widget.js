import React from "react"
import "./widget.scss"

// Widget :: Props -> React.Component
const Widget = ({
  id = "",
  url = "",
  isPlaying = false,
  isLoading = false,
  isReady = false,
  error = null,
  play = () => {},
  pause = () => {},
}) =>
  <div className="soundcloud-widget">
    {isReady &&
      <div className="controls">
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
      </div>
    }

    {error &&
      <p className="error">
        Une erreur est survenue : {error}. Veuillez réessayer.
      </p>
    }

    {/* This is hidden and used just to provide access to the Widget API, as the
      * REST API can no longer be used because it requires an API KEY which can
      * no longer be obtained from soundcloud as they closed app registrations.
      */}
    <iframe
      className="is-hidden"
      id={id}
      title={id}
      src={`https://w.soundcloud.com/player/?url=${url}`}
      allow="autoplay"
    >
    </iframe>
  </div>

export default Widget
