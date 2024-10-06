const Course = require("../models/Course");
const { errorHandler } = require("../auth");

module.exports.addCourse = (req, res) => {
  let newCourse = new Course({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  Course.findOne({ name: req.body.name }).then(existingCourse => {
      if (existingCourse) {
        return res.status(409).send({message: 'Course Already exists'});
      } else {
        return newCourse.save()
          .then(result => res.status(201).send({
                success: true, 
                message: 'Course Added scucessfully', 
                result})
          ).catch((err) => errorHandler(err, req, res));
      }
    })
    .catch((err) => errorHandler(err, req, res));
};


module.exports.getAllCourses = (req, res) => {
    return Course.find({}).then(result => {
      if(result.length > 0) {
          res.status(200).send({ result })
      } else {
        res.status(404).send({ message: 'No courses found' })
      }
    })
    .catch(err => errorHandler(err, req, res));
};


module.exports.getAllActive = (req, res) => {
  Course.find({ isActive: true }).then((result) => {
        if(result.length > 0) {
          res.status(200).send({result})
        } else {
          return res.status(404).send({ message: 'No active courses found'});
        }
    })
    .catch((err) => errorHandler(err, req, res));
};


module.exports.getCourse = (req, res) => {
    return Course.findById(req.params.id).then(course => {
      if(course) {
        res.status(200).send({course});
      } else {
        res.status(404).send({ message: 'Course not found'});
      }
    })
    .catch(err => errorHandler(err, req, res)); 
};


module.exports.updateCourse = (req, res)=>{
    let updatedCourse = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    return Course.findByIdAndUpdate(req.params.id, updatedCourse)
    .then(course => {
        if (course) {
            res.status(200).send({ success: true, message: 'Course updated successfully'});
        } else {
            res.status(404).send({ messgae: 'Course not found'});
        }
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.archiveCourse = (req, res) => {
    let updateActiveField = {
      isActive: false
    }

    return Course.findByIdAndUpdate(req.params.id, updateActiveField)
    .then(course => {
        if (course) {
          if(!course.isActive) {
            return res.status(200).send({ message: 'Course already archived', course });
          } 
            return res.status(200).send({ success: true, message: 'Course archived successfully'});     
        } else {
            return res.status(404).send({ message: 'Course not found'});
        }
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.activateCourse = (req, res) => {     
    let updateActiveField = {
      isActive: true,
    };
  
    Course.findById(req.params.courseId).then((course) => {
        if (!course) {
      
          return res.status(404).send(false);
        }
  
        if (course.isActive) {
          return res.status(200).send({ message: "Course already activated" });
        }
  
        return Course.findByIdAndUpdate(req.params.courseId, updateActiveField)
          .then(() => res.status(200).send({success: true, message: 'Course activated successfully'}))
          .catch((error) => errorHandler(error, req, res));
      })
      .catch((error) => errorHandler(error, req, res));
  };