const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

mongoose.connect('mongodb+srv://admin:admin1234@aguhobdb.e7hub.mongodb.net/b481_to-do?retryWrites=true&w=majority&appName=aguhobDB');

let db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => console.log("We're connection to the cloud database"))

// Mongoose Schema
const taskSchema = new mongoose.Schema({
    name: String,
    status: {
        type: String,
        default: "pending"
    }
})
// mongoose model
const Task = mongoose.model('Task', taskSchema);

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Routes
// creating a new task
app.post("/tasks", (req, res) => {
   Task.findOne({name: req.body.name}).then((result, err) => {
    if(result !== null && result.name == req.body.name) {
        return res.send('Duplicate task found');
    } else {
        let newTask = new Task({
            name: req.body.name
        });
        newTask.save().then((savedTask, saveErr) => {
            if(saveErr) {
                return console.error(saveErr);
            } else {
                return res.send("New task created");
            }
        })
    }
   }) 
});

if(require.main === module) {
    app.listen(port, () => console.log(`Server is running at port: ${port}`));
}

module.exports = {app, mongoose};