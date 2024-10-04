// Activity: Dependencies and Modules
const Course = require("../models/Course");
// use the "require" directive to allow access to the errorHandler() function inside the auth.js file
const { errorHandler } = require('../auth');

// Activity: Create a course
module.exports.addCourse = (req, res) => {

    // try... catch... is used to catch errors that might ocuur before the save operation
    // try {
        let newCourse = new Course({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price
        });

        return newCourse.save()
        .then(result => res.send(result))
        // Promise.catch() method
        // Promise based return "Promises" which can be chained with a .catch method to handle any errors that can occur during execution
        // using .catch() is  cnsidered a best practice for handling error within JS promise blocks
        // Error handling is done using .catch() to capture any errors that can occur during the course save action
        // uses the errorHandler middleware
        .catch(err => errorHandler(err, req, res)) // .catch(err => err) - captures the error but does not take any action, its only capturing and saving it in the variable "err" then returning variable "err"
    // } catch(err) {

    //     // Error Logging
    //     // this will be displayed in the terminal/broswer console
    //     console.log('Result of console.error:');
    //     console.error(err);

    //     res.send("Error in variables");
    // }
}; 

// Activity: Retrieve all courses
module.exports.getAllCourses = (req, res) => {

    return Course.find({})
    .then(result => res.send(result))
    .catch(err => errorHandler(err, req, res));
};

// Activity: Retrieve all active courses
module.exports.getAllActive = (req, res) => {

    Course.find({ isActive: true })
    .then(result => res.send(result))
    .catch(err => errorHandler(err, req, res));
};

// Activity: Retrieve a specific cours
module.exports.getCourse = (req, res) => {

    // req.params.id will be used to access the value of the courseID to be found by  the mongoose method
    Course.findById(req.params.id)
    .then(course => res.send(course))
    .catch(err => errorHandler(err, req, res)); 
};


// ================= Updating the course =========================
module.exports.updateCourse = (req, res) => {

    const updates = req.body;
    
    Course.findByIdAndUpdate(req.params.id, updates)
    .then(result => res.send(true))        
    .catch(err => errorHandler(err, req, res));
};

// module.exports.updateCourse = (req, res) => {

//     const updates = req.body;

//         Course.findByIdAndUpdate(req.params.id, updates)
//         .then((result) => {
//             if(result) {
//                 res.send(true);
//             } else {
//                 res.error('Error updating the course')
//             }
//         })        
//         .catch(err => errorHandler(err, req, res));
//     };

//================== End of updating course==========

module.exports.archiveCourse = (req, res) => {
    Course.findById(req.params.id).then(course => {
        if(!course) { 
            return res.send(false);
        } else {
            course.isActive = false;
            return course.save()
            .then(result => res.send(true))
            .catch(err => errorHandler(err, req, res));
            // return res.send(true);
        }
    }).catch(err => errorHandler(err, req, res));
}

/*
[ACTIVITY S45:  Member 5 (AR)]
Create a route "/:courseId/activate" for activating a course using PATCH method. 
    - Create a route that restores courses that have been deactivated. 
    - This route should implement JWT authentication and extract the course ID from the URL. 
    - Note that only administrators are allowed to activate courses. 
Create a controller method "activateCourse" for activating a course obtaining the course ID from the request params.
    - Simply update the course "isActive" status into "true".
    - Send a response back to the client with the boolean true if successful.
    - Catch the error and send it to the client.
Process a PATCH request at the /:courseId/activate route using postman to activate a course.
*/

module.exports.activateCourse = (req, res) => {
    Course.findById(req.params.id).then(course => {
        if(!course) { 
            return res.send(false);
        } else {
            course.isActive = true;
            return course.save().then(result => res.send(true))
            .catch(err => errorHandler(err, req, res));
        }
    }).catch(err => errorHandler(err, req, res));

//   const { id } = req.params;

//   Course.findByIdAndUpdate(id, { isActive: true }, { new: true }).then((updatedCourse) => {
//       if (!updatedCourse) {
//         return res.status(404).json({ message: "Course not found" });
//       }
//       return res.status(200).json(true);
//     }).catch(err => errorHandler(err, req, res);
//     );
};

