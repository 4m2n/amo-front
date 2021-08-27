import React from "react"
import wrapWithProvider from "./wrap-with-provider"

export const wrapRootElement = wrapWithProvider

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="sc-sdk" src="https://w.soundcloud.com/player/api.js" />,
    <script
      key="beampipe"
      async
      defer
      src="https://beampipe.io/js/tracker.js"
      data-beampipe-domain="amo-musique.fr"
    >
    </script>,
  ])
}
