import React from "react"
import Contact from "./../contact/contact"
import Biography from "./../biography"
import ExtendedPlay from "./extended-play"
import "./homepage.scss"
import Image from "./../image/image.js"

// Homepage :: () -> React.Component
const Homepage = () =>
  <section className="homepage">
    <figure className="banner">
      <Image
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

    <ExtendedPlay />
  </section>

export default Homepage
