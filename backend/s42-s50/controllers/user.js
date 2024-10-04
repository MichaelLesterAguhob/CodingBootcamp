const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

// use the "require" directive to load bcryptjs module/package that allows us to encrypt information
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const { errorHandler } = require('../auth');

module.exports.registerUser = (reqBody) => {

	// creates a variable named "newUser" and instantiates a new "User" document using the mongooose model
	// uses the information fron the request body to provide all necessary information
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		// password: reqBody.password
		// hashSync() method of the bcrypt module is responsible for hasing/encrypting our information
		// it accepts 2 arguments, the first argument is the information to be encrypted. the second arguments is the number of salt rounds.
		password: bcrypt.hashSync(reqBody.password, 10)
	});

	// save the created document to our database using the save() method
	// save() method can have 2 results:
		// if the save is successful, the document created will be returned and stored in the "result" variable
		// if the save is unsuccessful, it will catch the error and store it in the variable "err" then return it to the client
	return newUser.save()
    .then((result) => res.send(result))
    .catch(err => errorHandler(err, req, res))
}

// controller function for user authentication
module.exports.loginUser = (req, res) => {

	// use the findOne() method to search for the first document in the "users" collection that matches the email given in the request body.
	// it will return the document and store it in the variable "result"
	return User.findOne({email: req.body.email}).then(result => {

		// if no document was found
		if(result == null) {

			return res.send(false);

		// If a document was found
		} else {

			// compareSync() method will compare the given arguments and check if it matches. it compares the non encrypted password to the encrypted password
			// it will store the boolean result in the variable "isPasswordCorrect". if the passwords match return true, else return false
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

			// if the password matches
			if(isPasswordCorrect) {

				// generate an access token
				// invoke the createAcessToken() in auth.js and send the user document as argument
				return res.send({ access : auth.createAccessToken(result)});

			// if the password do not match
			} else {

				return res.send(false);
			}
		}
	})
	.catch(err => errorHandler(err, req, res));
}

// Activity: Check if the email already exists
module.exports.checkEmailExists = (req, res) => {

    return User.find({ email : req.body.email })
    .then(result => {

        if (result.length > 0) {

            return res.status(409).send(true);

        } else {

            return res.status(404).send(false);
        };
    })
    .catch(err => errorHandler(err, req, res))
    // .catch(err => errorHandler(err, req, res))
};

// Activity: Retrieve user details
// the getProfile method now has access to the "req", "res" oj=bjects 
module.exports.getProfile = (req, res) => {

    return User.findById(req.user.id)
    .then(result => {
        result.password = "";
        return res.status(200).send(result);
    })
    .catch(err => errorHandler(err, req, res))
};

module.exports.enroll = (req, res) => {
	if(req.user.isAdmin) {
		return res.status(403).send(false);
	}
	let newEnrollment = new Enrollment({
		userId: req.user.id,
		enrolledCourses: req.body.enrolledCourses,
		totalPrice: req.body.totalPrice
	})
	return newEnrollment.save().then(enrolled => res.status(200).send(true)).catch(err => errorHandler(err, req, res));
}

