import React from "react"
import Contact from "./../contact/contact"
import Biography from "./../biography/biography"
import bkg from "./../../assets/images/AMO_bkg.jpg"
import "./homepage.scss"

// Homepage :: () -> React.Component
export default () =>
  <section className="homepage">
    <figure>
      <img src={bkg} alt="mout" />
      <figcaption>
        <Contact
          showSocialNetworks={true}
          className="is-hidden-mobile"
        />
      </figcaption>
    </figure>

    <Biography />
  </section>