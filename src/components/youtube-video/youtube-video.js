import React from "react"
import "./youtube-video.scss"

// YoutubeVideo :: Props -> React.Component
const YoutubeVideo = ({
  src = "",
}) =>
  <div className="video-wrapper">
    <iframe
      src={src}
      title="youtube-video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    >
    </iframe>
  </div>

export default YoutubeVideo;
