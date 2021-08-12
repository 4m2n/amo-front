exports.createPages = ({ actions }) => {
  actions.createPage({
    path: "/",
    component: require.resolve(`./src/templates/homepage.js`),
  })

  actions.createPage({
    path: "/concerts",
    component: require.resolve(`./src/templates/tour.js`),
  })

  actions.createPage({
    path: "/pro",
    component: require.resolve(`./src/templates/pro.js`),
  })
}
