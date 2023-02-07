const createError = require("http-errors");

exports.NotFoundHandler = (req, res, next) => {
	const error = createError.NotFound("Resource not found!");
	return next(error);
};

exports.MainErrorHandler = (error, req, res, next) => {
	const { status = 500, message = "Something went wrong!" } = error;
	return res.status(status).json({ message, status });
};
