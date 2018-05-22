const users = []

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    register: (parent, args) => {
      const user = {
        name: args.name,
        email: args.email,
        password: args.password,
      }
      
      return user
    },
    login: (parent, args) => {
      const email = args.email
      const password = args.password
      
      return []
    },
  },
}

export default resolvers;