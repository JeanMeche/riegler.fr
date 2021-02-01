/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    if (stage.startsWith("build-javascript")) {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /react-spring/, // cf https://github.com/pmndrs/react-spring/issues/1069
              sideEffects: true
            }
          ]
        }
      })
    }
  }