// BASIC EXPRESSJS SERVER

// Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const taskRoute = require("./routes/taskRoutes.js")
// server setup
const app = express(); 
const port = 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// modgoDb connection
mongoose.connect('mongodb+srv://admin:admin1234@aguhobdb.e7hub.mongodb.net/b481_to-do?retryWrites=true&w=majority&appName=aguhobDB');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Now connected to MongoDb Atlas'));

app.use("/tasks", taskRoute);

if(require.main === module) {
    app.listen(port, () => console.log(`Server running at port: ${port}`))
}

module.exports = {app, mongoose};