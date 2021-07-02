import React from "react"
import "./contact.scss"

// Contact :: Props -> React.Component
const Footer = ({
  showSocialNetworks = true,
  className = "",
}) =>
  <div className={`${className} contact`}>
    <a href="tel:+33767437685">+33 7 67 43 76 85</a>
    <a href="mailto:contact@amo-musique.fr">contact@amo-musique.fr</a>

    {showSocialNetworks &&
      <div className="social-networks">
        <a
          className="im"
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/amo.musique"
        >
          a
        </a>
        <a
          className="im"
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/amo.musique"
        >
          z
        </a>
        <a
          className="im"
          target="_blank"
          rel="noreferrer"
          href="https://soundcloud.com/amo-musique"
        >
          e
        </a>
      </div>
    }
  </div>

export default Footer
