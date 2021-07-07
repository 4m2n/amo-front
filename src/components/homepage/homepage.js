import React, { useState } from "react"
import Contact from "./../contact/contact"
import Biography from "./../biography"
import bkg from "./../../assets/images/AMO_bkg.jpg"
import meandres from "./../../assets/images/meandres.png"
import "./homepage.scss"

// getMailto :: () -> String
const getMailto = () => [
  "mailto:contact@amo-musique.fr",
  "?subject=Commande EP méandres",
  "&body=Bonjour, je souhaiterais commander votre EP « Méandres »."
].join('')

// Homepage :: () -> React.Component
const Homepage = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
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

            <button className="btn-teal" onClick={() => setModalOpened(true)}>
              Commander (5€)
            </button>
          </aside>
        </div>
      </div>

      {modalOpened &&
        <div className="order-modal">
          <div className="background container">
            <h3>
              La boutique est en construction !&nbsp;
              <span className="im">r</span>
            </h3>
            <p>
              Envoyez-moi un email à&nbsp;
              <a href={getMailto()}>contact@amo-musique.fr</a> pour commander !
            </p>
            <button className="btn-teal" onClick={() => setModalOpened(false)}>
              Fermer
            </button>
          </div>
        </div>
      }
    </section>
  )
}


export default Homepage
