import React from "react"
import Widget from "./../../soundcloud/widget"
import Controls from "./../../soundcloud/controls"
import Loader from "./../../loader"
import {
  toFrenchDate,
} from "./../../../utils"
import "./latest-interview.scss"

// LatestInterview :: Props -> React.Component
const LatestInterview = ({
  interview = {},
}) =>
  <div className="latest-interview">
    <h1 className="title">Dernières actualités</h1>
    <Widget
      id="sc-interview"
      url="https%3A//api.soundcloud.com/playlists/1290749911"
    />

    {interview !== null
      ? <>
          <figure>
            <img src={interview.artwork_url} alt="" />
            <figcaption>
              <Controls />
            </figcaption>
          </figure>
          <time>
            {toFrenchDate(interview.created_at)}
          </time>
          <p className="description">
            {interview.description}
          </p>
        </>
    : <Loader />
    }
  </div>

export default LatestInterview
