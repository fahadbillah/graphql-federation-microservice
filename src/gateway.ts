const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");

// Initialize an ApolloGateway instance and pass it an array of implementing
// service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: 'http://localhost:4001' },
    // more services
  ],
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀 gateway ready at ${url}`);
});