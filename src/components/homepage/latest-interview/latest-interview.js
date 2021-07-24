import React from "react"
import Widget from "./../../soundcloud/widget"
import {
  toFrenchDate,
} from "./../../../utils"
import "./latest-interview.scss"

// LatestInterview :: Props -> React.Component
const LatestInterview = ({
  interview = {},
  isReady = false,
}) =>
  <div className="latest-interview">
    <h1 className="title">Dernières actualités</h1>
    <Widget
      id="sc-interview"
      url="https%3A//api.soundcloud.com/playlists/1290749911"
    />

    {isReady
      ? interview !== null
        ? <>
            <img src={interview.artwork_url} alt="" />
            <time>
              {toFrenchDate(interview.created_at)}
            </time>
            <p className="description">
              {interview.description}
            </p>
          </>
        : <p>Pas de nouveautés en ce moment !</p>
      : <p>Chargement en cours...</p>
    }
  </div>

export default LatestInterview
