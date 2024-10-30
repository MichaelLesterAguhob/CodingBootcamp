
const Workout = require('../models/Workout')

module.exports.addWorkout = async (req, res) => {
    const {name, duration} = req.body;

    const newWorkout = Workout({
        userId: req.user.id,
        name: name,
        duration: duration 
    })

    await newWorkout.save().then(result => {
        if(result) {
            res.status(201).send(result)
        }
    }).catch(err => console.error(err))

}

module.exports.getWorkouts = async (req, res) => {
    let userId = req.user.id;
    await Workout.find({userId}).then(workouts => {
        if(workouts) {
            res.status(200).send({workouts})
        } else {
            res.status(404).send({message: "No workouts found"})
        }
    }).catch(err => console.error(err));
} 

module.exports.updateWorkout = async (req, res) => {
    
    let updates = {
        name: req.body.name,
        duration: req.body.duration,
    }
    await Workout.findByIdAndUpdate(req.params.id, updates, {new:true}).then(updatedWorkout => {
        if(updatedWorkout) {
            res.status(200).send({message: "Workout updated successfully", updatedWorkout})
        } else {
            res.status(404).send({message: "No workouts found"})
        }
    }).catch(err => console.error(err));
} 



module.exports.completeWorkoutStatus = async (req, res) => {
    
    await Workout.findByIdAndUpdate(req.params.id, {status: "completed"}, {new: true}).then(updatedWorkout => {
        if(updatedWorkout) {
            res.status(200).send({message: "Workout status updated successfully", updatedWorkout})
        } else {
            res.status(404).send({message: "No workouts found"})
        }
    }).catch(err => console.error(err));
} 



module.exports.deleteWorkout = async (req, res) => {
    
    await Workout.findByIdAndDelete(req.params.id).then(deleted => {
        if(deleted) {
            res.status(200).send({message: "Workout deleted successfully"})
        } else {
            res.status(404).send({message: "No workouts found"})
        }
    }).catch(err => console.error(err));
} 