module.exports = {
  siteMetadata: {
    title: "AMO front",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "none",
          quality: 50,
          breakpoints: [768, 1024, 1216, 1408],
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/markdown`,
      },
    },
    "gatsby-transformer-remark",
  ],
};
