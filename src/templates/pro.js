import React from "react"
import Layout from "./../components/layout/layout"
import Pro from "./../components/pro"

// ProTemplate :: Props -> React.Component
const ProTemplate = ({
  path,
}) =>
  <Layout path={path} >
    <Pro />
  </Layout>

export default ProTemplate
