import { createError } from 'apollo-errors';

const StandardError = createError('StandardError', {
	message: 'Something went wrong.'
});

const RegisterError = createError('RegisterError', {
	message: 'The provided information is not unique.'
});

const LoginError = createError('LoginError', {
	message: 'The provided credentials are invalid.'
});

const AuthError = createError('AuthError', {
	message: 'Authorization failed.'
});

export { StandardError, RegisterError, LoginError, AuthError };
