// this file contain all of the business logic abnd functions for performing different tasks
 
const Task = require("../models/Task");
// 
module.exports.getAllTasks = () => {
    
    return Task.find({}).then(result => {
        return result;
    })
}; 

module.exports.createTask = (reqBody) => {
    let newTask = new Task({
        name: reqBody.name
    })
    return newTask.save().then((savedTask, saveErr) => {
        if(saveErr) {
            console.log(saveErr);
            return false;
        } else {
            return savedTask;
        }
    })
}

module.exports.deleteTask = (taskId) => {
    return Task.findByIdAndDelete(taskId)
    .then(removedTask => removedTask)
    .catch(err => false)
}

module.exports.updateTask = (taskId, reqBody) => {
    return Task.findById(taskId).then((result, error) => {
        if(error) {
            console.log(error);
            return false;
        } 

        result.name = reqBody.name;
        return result.save().then((updatedTask, saveErr) => {
            if(saveErr) {
                console.log(saveErr);
                return false;
            } else {
                return updatedTask;
            }
        })
    })
}