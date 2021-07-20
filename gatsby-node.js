exports.createPages = ({ actions }) => {
  actions.createPage({
    path: "/",
    component: require.resolve(`./src/templates/homepage.js`),
  })

  actions.createPage({
    path: "/concerts",
    component: require.resolve(`./src/templates/tour.js`),
  })
}
