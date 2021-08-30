import React from "react"
import Biography from "./../biography"
import Contact from "./../contact/contact"
import ExtendedPlay from "./extended-play"
import Image from "./../image"
import LatestInterview from "./latest-interview"
import NextShow from "./../tour/next-show"
import "./homepage.scss"

// Homepage :: () -> React.Component
const Homepage = () =>
  <section className="homepage">
    <figure className="banner">
      <Image
        id="homepage-banner"
        filename="AMO_bkg"
        alt="mout"
        sizes={[768, 1024, 1216, 1408]}
        formats={["webp", "jpg"]}
        width={768}
        height={257}
      />
      <figcaption>
        <Contact showSocialNetworks={true} />
      </figcaption>
    </figure>

    <Biography />

    <section className="newscast container">
      <LatestInterview />
      <NextShow />
    </section>

    <ExtendedPlay />
  </section>

export default Homepage
