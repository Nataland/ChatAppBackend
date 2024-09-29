import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuidv4 } from 'uuid';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
type Message {
    id: ID!
    body: String
}

type Query {
    message(input: String!): Message
}
`;

// const books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glass',
//       author: 'Paul Auster',
//     },
//   ];

const resolvers = {
    Query: {
        message: (input: String) => {
            const numberOfMeows = randomIntFromInterval(1, 10)
            let arr = new Array<String>(numberOfMeows).fill("Meow")
            return {
                id: uuidv4(),
                body: arr.join(" ")
            }
        },
    },
  };

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: {
        port: Number(process.env.PORT) || 4000,
      },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
