
const jwt = require("jsonwebtoken");
const secret = "FitnessTrackerApp";

module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin 
	};

	return jwt.sign(data, secret, {});
}

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;
    if(typeof token === 'undefined') {
        return res.status(400).send({message: "Authentication failed. No token"})
    } else {
        token = token.slice(7, token.length);
        jwt.verify(token, secret, function(err, decodedToken) {
            if(err) {
                return res.status(400).send({auth: "Failed", message: err.message})
            }
            req.user = decodedToken;
            next();
        })
    }
}

module.exports.errorHandler = (err, req, res, next) => {

	console.error(err);
	const statusCode = err.status || 500;

	const errorMessage = err.message || 'Internal Server Error';
	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER ERROR',
			details: err.details || null 
		}
	})
}

