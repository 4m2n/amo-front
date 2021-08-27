import React from "react"
import Layout from "./../components/layout/layout"
import Homepage from "./../components/homepage/homepage"
import Seo from "./../components/seo"
import meandres from "./../assets/images/meandres_cover_500.jpg"

// String
const description = [
  "Bonjour et bienvenue sur le site d'AMO ! Je suis chanteur et guitariste,",
  "influencé autant par la musique française qu'anglo-saxonne.",
].join(" ")

// HomepageTemplate :: Props -> React.Component
const HomepageTemplate = ({
  path,
}) =>
  <Layout path={path}>
    <Seo
      description={description}
      keywords={["amo", "chanteur", "folk", "français"]}
      image={meandres}
    />
    <Homepage />
  </Layout>

export default HomepageTemplate
