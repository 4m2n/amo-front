import React from "react"
import Biography from "./../biography"
import Contact from "./../contact/contact"
import ExtendedPlay from "./extended-play"
import Image from "./../image"
import LatestInterview from "./latest-interview"
import NextShow from "./../tour/next-show"
import "./homepage.scss"
import banner1 from "./../../assets/images/banner-1.jpg"
import banner2 from "./../../assets/images/banner-2.jpg"

// Homepage :: () -> React.Component
const Homepage = () =>
  <section className="homepage">
    <figure className="banner">
      {/* <Image
        id="homepage-banner"
        filename="AMO_bkg"
        alt="mout"
        sizes={[768, 1024, 1216, 1408]}
        formats={["webp", "jpg"]}
        width={768}
        height={257}
      /> */}
      <img src={banner1} />
      <figcaption>
        <Contact showSocialNetworks={true} />
      </figcaption>
    </figure>

    <Biography />

    <section className="newscast container">
      <LatestInterview />
      <div className="separator is-hidden-mobile"></div>
      <NextShow />
    </section>

    <ExtendedPlay />
  </section>

export default Homepage
