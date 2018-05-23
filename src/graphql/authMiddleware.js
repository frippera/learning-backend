import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		console.log('token exists');
		req.token = token;
	} else {
		console.log('token not found');
		req.token = '';
	}

	next();
};

export { authMiddleware };
