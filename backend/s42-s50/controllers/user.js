const User = require('../models/User');
// use the "require" directive to load bcryptjs module/package that allows us to encrypt information
const bcrypt = require('bcryptjs');
const auth = require('../auth');

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
	return newUser.save().then(result => result).catch(err => err);
}

// controller function for user authentication
module.exports.loginUser = (reqBody) => {
 
	// use the findOne() method to search for the first document in the "users" collection that matches the email given in the request body.
	// it will return the document and store it in the variable "result"
	return User.findOne({email: reqBody.email}).then(result => {

		// if no document was found
		if(result == null) {

			return false;

		// If a document was found
		} else {

			// compareSync() method will compare the given arguments and check if it matches. it compares the non encrypted password to the encrypted password
			// it will store the boolean result in the variable "isPasswordCorrect". if the passwords match return true, else return false
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			// if the password matches
			if(isPasswordCorrect) {

				// generate an access token
				// invoke the createAcessToken() in auth.js and send the user document as argument
				return { access: auth.createAccessToken(result) }

			// if the password do not match
			} else {

				return false;
			}
		}
	})
	.catch(err => err);
}

module.exports.checkEmailExists = (reqBody) => {

	return User.findOne({email: reqBody.email}).then(result => {

		if(result) {
			return true;
		} else {
			return false;
		}
	})
}

module.exports.getProfile = (req, res) => {
	
	return User.findById(req.user.id).then(result => {
		if(result) {
            result.password = '';
			return res.send(result); 
		} else {
			return res.send(false);
		}
	})   
}