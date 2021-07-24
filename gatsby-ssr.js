import React from "react"

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script src="https://w.soundcloud.com/player/api.js" />,
  ])
}
