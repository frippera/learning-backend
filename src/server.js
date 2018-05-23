import 'babel-polyfill';
import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';

import mongoose from 'mongoose';
import { formatError } from 'apollo-errors';
import dotenv from 'dotenv';
dotenv.load();

import resolvers from './graphql/resolvers';
const typeDefs = importSchema('./src/graphql/schema.graphql');
//import { authMiddleware } from './graphql/authMiddleware';

const connection = mongoose.connect(process.env.DB);

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: (req) => ({ ...req })
});

const serverOptions = {
	port: 4000,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/playground',
	formatError
};

//server.express.use(authMiddleware);

server.start(serverOptions, () => console.log(`Server is running`));
