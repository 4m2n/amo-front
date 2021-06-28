import React from "react"
import Contact from "./../contact/contact"
import Biography from "./../biography/biography"
import bkg from "./../../assets/images/AMO_bkg.jpg"
import meandres from "./../../assets/images/meandres.png"
import "./homepage.scss"

// Homepage :: () -> React.Component
const Homepage = () =>
  <section className="homepage">
    <figure>
      <img src={bkg} alt="mout" />
      <figcaption>
        <Contact showSocialNetworks={true} />
      </figcaption>
    </figure>

    <Biography />

    <div className="extended-play">
      <div className="container">
        <figure>
          <img src={meandres} alt="méandres" />
        </figure>
        <aside>
          <h1>Nouvel EP</h1>
          <h2>MÉANDRES</h2>
          <p>
            5 titres<br/>
            17'
          </p>
          <p>
            Disponible en CD
          </p>
        </aside>
      </div>
    </div>
  </section>

export default Homepage
