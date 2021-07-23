import React from "react"
import Layout from "./../components/layout/layout"
import Homepage from "./../components/homepage/homepage"

// HomepageTemplate :: Props -> React.Component
const HomepageTemplate = ({
  path,
}) =>
  <Layout path={path} >
    <Homepage />
  </Layout>

export default HomepageTemplate
