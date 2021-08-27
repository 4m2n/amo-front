import React from "react"
import Layout from "./../components/layout/layout"
import Pro from "./../components/pro"
import Seo from "./../components/seo"

// String
const description = [
  "Professionnels, retrouvez içi les documents nécessaires à la préparation",
  "du concert : fiche technique et brochure commerciale.",
].join(" ")

// ProTemplate :: Props -> React.Component
const ProTemplate = ({
  path,
}) =>
  <Layout path={path}>
    <Seo
      title="AMO - espace pro"
      description={description}
      keywords={["pro", "technique", "brochure", "commerciale"]}
    />
    <Pro />
  </Layout>

export default ProTemplate
