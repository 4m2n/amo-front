import React from "react"
import "./widget.scss"

// Widget :: Props -> React.Component
const Widget = ({
  id = "",
  url = "",
  error = null,
}) =>
  <div className="soundcloud-widget">
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
