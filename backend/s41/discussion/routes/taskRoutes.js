// this file will contain all the endpoint for our app with HTTP methods

// dependencies and modules
const express = require("express");
const taskController = require("../controllers/taskControllers");

 
// ROUTING SYSTEM
// create a router instance that funtion as a middleware and routing system
// allows access to HTTP methods middleware that makes it easier to create routes for our app
const router = express.Router();

// route to get all tasks 
router.get("/", (req, res) => {
    taskController.getAllTasks().then(resultFromController => res.send(resultFromController));
})      

// Route to create a new task
router.post("/", (req, res) => {
    taskController.createTask(req.body).then(resultFromController => res.send(resultFromController));
})
 

// route to delete a task
//  exprect a delete request at the URI endpoint
// : means wildcard, it will store the value in the parameter to the given name. 
router.delete("/:id", (req, res) => {
    taskController.deleteTask(req.params.id).then(resultFromController => res.send(resultFromController));
})

// 
router.put("/:id", (req, res) => {
    taskController.updateTask(req.params.id, req.body).then(resultFromController => res.send(resultFromController));
})

module.exports = router;