// [SECTION] Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");

const { verify } = require("../auth");

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.post("/check-email", userController.checkEmailExists);

router.post("/details", verify, userController.getProfile);

router.post('/enroll', verify, userController.enroll);

router.get('/get-enrollments', verify, userController.getEnrollments);

module.exports = router;
