
const express = require("express");
const {verify} = require('../auth')
const router = express.Router();

const workoutController = require('../controllers/workout');


router.post('/addWorkout', verify, workoutController.addWorkout);
router.get('/getMyWorkouts', verify, workoutController.getWorkouts);
router.patch('/updateWorkout/:id', verify, workoutController.updateWorkout);
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);
router.patch('/completeWorkoutStatus/:id', verify, workoutController.completeWorkoutStatus);


module.exports = router