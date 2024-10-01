// this file contain all of the business logic abnd functions for performing different tasks

const Task = require("../models/Task");
// 
module.exports.getAllTasks = () => {
    
    return Task.find({}).then(result => {
        return result;
    })
};