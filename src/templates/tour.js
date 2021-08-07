import React from "react"
import Layout from "./../components/layout/layout"
import Tour from "./../components/tour"

// TourTemplate :: Props -> React.Component
const TourTemplate = ({
  path,
}) =>
  <Layout path={path} >
    <Tour />
  </Layout>

export default TourTemplate
