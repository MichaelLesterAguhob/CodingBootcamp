// [SECTION] Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");

// const { getProfile } = require("../controllers/user");
// import the auth module and deconstruct to use the verify() method
/*
	const auth = require('auth');
	auth.verify()
*/
const { verify } = require("../auth");

// [SECTION] Routing Component
// Router() allows access to the http methods
const router = express.Router();

// [SECTION] Routes

// Route for user registration
// this route expects to receive a POST request at the URI "/register"
// http://localhost:4000/users/register
router.post("/register", userController.registerUser);

// Route for user authentication
// This route expects to receive a POST request at the URI "/login"
router.post("/login", userController.loginUser);

// Activity: Routes for duplicate email
router.post("/check-email", userController.checkEmailExists);

// Activity: Route for retrieving user details
// since the "/details" route invokes the verify() method, we have access to the req.user which contains the decodedToken information (id, email, isAdmin)
router.post("/details", verify, userController.getProfile);

router.post('/enroll', verify, userController.enroll);

router.get('/get-enrollments', verify, userController.getEnrollments);

// [SECTION] Export Route System
// allows us to export the "router" object that will be accessed in index.js file
module.exports = router;
