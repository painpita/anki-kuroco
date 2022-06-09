/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")
const { ApolloClient, InMemoryCache, gql, split, HttpLink } = require("@apollo/client")
const { WebSocketLink } = require("@apollo/client/link/ws")
const { getMainDefinition } = require("@apollo/client/utilities")
const WebSocket = require("ws")
const fetch = require("node-fetch")

const POST_NODE_TYPE = `Post`

  const client = new ApolloClient({
    link: split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        )
      },
      new HttpLink({
        uri: "https://test-dimitri.g.kuroco.app/rcms-api/3/service",
        fetch,
      })
    ),
    cache: new InMemoryCache(),
  })
  
  exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
  }) => {
    const { createNode } = actions
    
  const { data } = await client.query({
      query: gql`
    query {
      posts {
        list
      }
    }
  `,
  })

  console.log(data)
  return
}
