import React from "react"
import Helmet from "react-helmet"

const Seo = ({
  keywords = [],
  title = "AMO - musique",
  description = "",
  image = null,
}) =>
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="Amaury Langlois" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image &&
      <meta property="og:image" content={image} />
    }
    {keywords.length > 0 &&
      <meta name="keywords" content={keywords.join(", ")} />
    }
  </Helmet>

export default Seo
