// Activity: Dependencies and Modules
const express = require("express");
const courseController = require("../controllers/course");
const { verify, verifyAdmin } = require("../auth");

// Activity: Routing Component
const router = express.Router();

// Activity: Route for creating a course
// we use the POST method if our request contains atleast 1 body property
router.post("/", verify, verifyAdmin, courseController.addCourse);

// Activity: Route for retrieving all courses
router.get("/all", verify, verifyAdmin, courseController.getAllCourses);

// Activity: Route for retrieving all active courses
router.get("/", courseController.getAllActive);

// Activity: Route for retrieving a specific course
// If the intention is to retrieve data. it should typically use the GET method
// In that case, we are going to send the course id through the parameter instead of the body
// the course id will be denoted by the ":id" also known as route parameters
// we can use the GET method if we do not have any body property in our request
router.get("/specific/:id", courseController.getCourse);


// Router for PATCH method updateCourse
router.patch('/:id', verify, verifyAdmin, courseController.updateCourse);

router.patch("/:id/archive", verify, verifyAdmin, courseController.archiveCourse);

router.patch("/:id/activate", verify, verifyAdmin, courseController.activateCourse);


// Activity: Export Route System
module.exports = router;
