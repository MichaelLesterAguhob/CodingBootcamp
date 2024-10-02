// [SECTION] Dependencies and Modules
const express = require('express');
const userController = require('../controllers/user');
const { verify } = require("../auth")

// [SECTION] Routing Component
// Router() allows access to the http methods
const router = express.Router();

// [SECTION] Routes

// Route for user registration
// this route expects to receive a POST request at the URI "/register"
// http://localhost:4000/users/register
router.post("/register", (req, res) => {

	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for user authentication
// thies route expects to receive a POST request at the URI "/login"
router.post("/login", (req, res) => {

	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})


router.post('/check-email', (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
})

router.post('/details', verify, userController.getProfile);


// [SECTION] Export Route System
// allows us to export the "router" object that will be accessed in index.js file
module.exports = router;