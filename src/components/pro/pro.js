import React from "react"
import technicalFile from "./../../assets/pdf/AMO_fiche_technique.pdf"
import marketingFile from "./../../assets/pdf/AMO_brochure.pdf"
import "./pro.scss"

// Pro :: () -> React.Component
const Pro = () =>
  <section className="pro container">
    <h1 className="title">Espace pro</h1>
    <div className="documents">
      <a
        title="Télécharger la fiche technique"
        href={technicalFile}
        target="_blank"
      >
        <span className="im">p</span>
        Fiche technique
      </a>
      <a
        title="Télécharger la brochure"
        href={marketingFile}
        target="_blank"
      >
        <span className="im">p</span>
        Brochure
      </a>
    </div>
  </section>

export default Pro
