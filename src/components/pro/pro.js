import React from "react"
import technicalFile from "./../../assets/pdf/AMO_fiche_technique.pdf"
import "./pro.scss"

// Pro :: () -> React.Component
const Pro = () =>
  <section className="pro container">
    <h1 className="title">Espace pro</h1>
    <a
      title="Télécharger la fiche technique"
      href={technicalFile}
      target="_blank"
    >
      <span className="im">p</span>
      Fiche technique
    </a>
  </section>

export default Pro
