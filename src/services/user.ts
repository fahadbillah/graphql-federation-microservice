import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String
    email: String
    password: String
  }

  type Query{
    users: [User]
    user(id: String): User
  }
`;

const users = [{
  id: 'uuid-1',
  name: 'Fahad Billah',
  email: 'billah22@gmail.com',
  password: '123'
}, {
  id: 'uuid-2',
  name: 'Tonmoy',
  email: 'billahfahad@gmail.com',
  password: '123'
}]

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.filter(user => user.id === id)[0]
  },
  User: {
    __resolveReference(user, { fetchUserById }) {
      return fetchUserById(user.id)
    }
  }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});
server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
