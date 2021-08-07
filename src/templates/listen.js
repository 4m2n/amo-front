import React from "react"
import Layout from "./../components/layout/layout"
import Listen from "./../components/listen"

// ListenTemplate :: Props -> React.Component
const ListenTemplate = ({
  path,
}) =>
  <Layout path={path} >
    <Listen />
  </Layout>

export default ListenTemplate
