import React from "react"
import Layout from "./../components/layout/layout"
import Tour from "./../components/tour"
import Seo from "./../components/seo"
import { query } from "./../components/tour/index"
import { getNextShowFromGraphql  } from "./../components/tour/next-show"
import { toFrenchDate  } from "./../utils"

// TourTemplate :: Props -> React.Component
export default function TourTemplate({
  path,
}) {
  /// Show
  const nextShow = getNextShowFromGraphql(query)

  // String
  const description = [
    "Ecouter la musique chez soi ou dans la rue c'est bien, mais rien de tel que",
    "le live pour ressentir pleinement la musique !",
    nextShow
      ? `Prochain concert le ${toFrenchDate(nextShow.date)} à ${nextShow.time} : ${nextShow.address}.`
      : ""
    ,
  ].join(" ")

  return (
    <Layout path={path}>
      <Seo
        title="AMO - concerts"
        description={description}
        keywords={["concerts", "spectacle", "dates", "live"]}
      />
      <Tour />
    </Layout>
  )
}
