//  this file will contain the schema, models, and export the file 

const mongoose = require("mongoose");
 
const taskSchema = new mongoose.Schema({
    name: String,
    status: {
        type: String,
        default: "pending"
    }
}); 

// mongoose model
// module.exports is a way for node.js to treat this value as a package that can be used in other parts of the application
module.exports = mongoose.model('Task', taskSchema);