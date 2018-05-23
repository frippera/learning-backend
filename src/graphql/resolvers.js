import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../database/schema/user.js';
import createToken from './createToken';
import getUser from './getUser';
import { RegisterError, LoginError, AuthError } from './errorHandler';

const resolvers = {
	Query: {
		users: async (parent, args, ctx, info) => {
			const userId = await getUser(ctx);

			if (!userId) {
				throw new AuthError();
			}

			return User.find({});
		},
		user: async (parent, { id }, ctx, info) => {
			const userId = await getUser(ctx);

			if (!userId) {
				throw new AuthError();
			}

			return User.findOne({ _id: id });
		}
	},
	Mutation: {
		register: async (parent, { name, email, password }) => {
			const newUser = { name, email, password };
			newUser.password = await bcrypt.hash(newUser.password, 12);

			const userExists = await User.findOne({ email });
			if (userExists) {
				throw new RegisterError();
			}

			const user = await User(newUser).save();
			const token = await createToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new LoginError();
			}

			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword) {
				throw new LoginError();
			}

			const token = await createToken(user);

			return { token, user };
		}
	}
};

export default resolvers;
