import React from "react"
import Widget from "./../soundcloud/widget"
import Controls from "./../soundcloud/controls"
import Image from "./../image"
import Lyrics from "./../lyrics"
import Loader from "./../loader"
import "./listen.scss"

// Track :: Props -> React.Component
export const Track = ({
  idx = 0,
  isPlaying = false,
  isSelected = false,
  next = () => {},
  title = "",
}) =>
  <button
    className={`track ${isSelected ? "is-selected" : ""} ${isPlaying ? "is-playing" : ""}`}
    onClick={() => !isPlaying ? next(idx) : undefined}
  >
    {isPlaying &&
      <span className="im is-hidden-mobile">t</span>
    }
    {idx+1}. {title}
  </button>

// Listen :: Props -> React.Component
const Listen = ({
  currentSound = {},
  isPlaying = false,
  next = () => {},
  trackList = [],
  lyrics = null,
}) =>
  <section className="listen">
    <Widget
      id="preprod-2020"
      url="https%3A//api.soundcloud.com/playlists/1374236014"
    />

    <Controls
      canSkipTracks={true}
    />

    <div className="container">
      <div className="tracklist">
        <h1 className="title">PREPROD 2022</h1>
        <div className="wrapper">
          <Image
            id="preprod-2022_cover"
            filename="preprod-2022_cover"
            alt="méandres"
            sizes={[500]}
            formats={["webp", "jpg"]}
            width={348}
            height={348}
          />
          {trackList.length > 0
            ? <div className="tracks">
                {trackList.map((track, idx) =>
                  <Track
                    {...track}
                    key={`track-${idx}`}
                    idx={idx}
                    next={next}
                    isPlaying={currentSound.title === track.title && isPlaying}
                    isSelected={currentSound.title === track.title}
                  />
                )}
            </div>
            : <Loader />
          }
        </div>
      </div>

      <div className="lyrics-wrapper">
        {lyrics && trackList.length > 0
          ? <Lyrics
              title={currentSound.title}
              data={lyrics}
            />
          : <Loader />
        }
      </div>
    </div>
  </section>

export default Listen
