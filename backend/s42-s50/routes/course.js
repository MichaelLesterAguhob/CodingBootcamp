const express = require("express");
const courseController = require("../controllers/course.js");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();


router.post("/", verify, verifyAdmin, courseController.addCourse);


router.get("/", (req, res) => {
    courseController.getAllCourses().then(resultFromController => res.send(resultFromController))
});

module.exports = router;