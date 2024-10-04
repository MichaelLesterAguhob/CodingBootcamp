
const express = require("express");
const courseController = require("../controllers/course");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/", verify, verifyAdmin, courseController.addCourse);

router.get("/all", verify, verifyAdmin, courseController.getAllCourses);

router.get("/", courseController.getAllActive);

router.get("/specific/:id", courseController.getCourse);

router.patch("/:id", verify, verifyAdmin, courseController.updateCourse);

router.patch("/:id/archive", verify, verifyAdmin, courseController.archiveCourse);

router.patch("/:id/activate", verify, verifyAdmin, courseController.activateCourse
);

module.exports = router;
