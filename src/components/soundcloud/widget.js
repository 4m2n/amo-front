import React from "react"

// Widget :: Props -> React.Component
export default ({
  id = "",
  url = "",
}) =>
  <iframe
    id={id}
    src={`https://w.soundcloud.com/player/?url=${url}`}
    allow="autoplay"
  >
  </iframe>
