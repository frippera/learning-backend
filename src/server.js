import 'babel-polyfill';
import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';

import mongoose from 'mongoose';
import { formatError } from 'apollo-errors';
import dotenv from 'dotenv';
dotenv.load();

import resolvers from './graphql/resolvers';
const typeDefs = importSchema('./src/graphql/schema.graphql');

const connection = mongoose.connect(process.env.DB);

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

const serverOptions = {
	formatError
};

/*
// TODO Add middelware to check for auth (token) and pass to resolvers
const validToken = jwt.verify(token, process.env.SECRET);
*/

server.start(serverOptions, () => console.log(`Server is running`));
