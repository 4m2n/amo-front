import React, { useState } from "react"
import meandres from "./../../assets/images/meandres.png"
import "./extended-play.scss"

// getMailto :: () -> String
const getMailto = () => [
  "mailto:contact@amo-musique.fr",
  "?subject=Commande EP méandres",
  "&body=Bonjour, je souhaiterais commander votre EP « Méandres »."
].join('')

// ExtendedPlay :: () -> React.Component
const ExtendedPlay = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
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
        <div
          className="order-modal"
          onClick={() => setModalOpened(false)}
          role="button"
          tabIndex={0}>
        >
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
    </>
  )
}

export default ExtendedPlay
