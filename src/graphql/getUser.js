import jwt from 'jsonwebtoken';

const getUser = async (ctx) => {
	const token = ctx.request.headers.authorization;

	if (token) {
		const decoded = await jwt.verify(token, process.env.SECRET);

		return decoded.userId;
	}

	return null;
};

export default getUser;
