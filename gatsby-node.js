exports.createPages = ({ actions }) => {
  actions.createPage({
    path: "/",
    component: require.resolve(`./src/templates/homepage.js`),
  })
}
