import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Contact from "./../contact/contact"
import Biography from "./../biography"
import ExtendedPlay from "./extended-play"
import "./homepage.scss"

// Homepage :: () -> React.Component
const Homepage = () =>
  <section className="homepage">
    <figure>
      <StaticImage src="./../../assets/images/AMO_bkg.jpg" alt="mout" />
      <figcaption>
        <Contact showSocialNetworks={true} />
      </figcaption>
    </figure>

    <Biography />

    <ExtendedPlay />
  </section>

export default Homepage
