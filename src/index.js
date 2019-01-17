const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    info: () => null,
    feed: () => links
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (_, args) => {
      let modifiedLink = null
      links = links.map((link) => {
        if (args.id === link.id) {
          modifiedLink = {
            ...link,
            url: args.url,
            description: args.description
          }
          return modifiedLink
        }
        return link
      })
      console.log('updateLink links after update:', links)
      return modifiedLink
    },
    deleteLink: (_, args) => {
      let deletedLink = null
      links = links.filter(link => {
        if (link.id === args.id) {
          deletedLink = link
          return false
        }
        return true
      })
      return deletedLink
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))