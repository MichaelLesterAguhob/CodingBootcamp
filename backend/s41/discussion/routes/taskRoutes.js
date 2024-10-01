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

module.exports = router;