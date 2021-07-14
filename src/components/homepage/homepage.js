import React from "react"
import Contact from "./../contact/contact"
import Biography from "./../biography"
import ExtendedPlay from "./extended-play"
import "./homepage.scss"
import Image from "./../image/image.js"

// Homepage :: () -> React.Component
const Homepage = () =>
  <section className="homepage">
    <figure>
      <Image filename="AMO_bkg" />
      <figcaption>
        <Contact showSocialNetworks={true} />
      </figcaption>
    </figure>

    <Biography />

    <ExtendedPlay />
  </section>

export default Homepage
