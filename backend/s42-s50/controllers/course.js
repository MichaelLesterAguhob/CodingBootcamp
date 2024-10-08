const Course = require("../models/Course");
const { errorHandler } = require("../auth");
const { find } = require("../models/User");

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
            res.status(404).send({ message: 'Course not found'});
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


  module.exports.searchCoursesByName = async (req, res) => {
    try {
      const { courseName } = req.body;
  
      // Use a regular expression to perform a case-insensitive search
      const courses = await Course.find({
        name: { $regex: courseName, $options: 'i' }
      });
  
      res.send(courses);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };


module.exports.getEmailsOfEnrolledUsers = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const enrollments = await Enrollment.find({ 'enrolledCourses.courseId': courseId });

        if (!enrollments.length) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const userIds = enrollments.map(enrollment => enrollment.userId);
        const enrolledUsers = await User.find({ _id: { $in: userIds } });
        const emails = enrolledUsers.map(user => user.email);
        res.status(200).json({ userEmails: emails });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving enrolled users' });
    }
};

module.exports.searchCoursesByPrice = async (req, res) => {

  const {minPrice, maxPrice} = req.body;

  if(minPrice == null || maxPrice == null) {
    return res.status(400).send({ message: "minPrice and maxPrice are required." });
  }

  try {

      const courses = await Course.find({ 
        price: {$gte: minPrice, $lte: maxPrice} 
      });

      return res.status(200).send({courses})
  } catch(error) {
      console.error(error);
      return res.status(500).send({ message: 'Failed to get courses by price range' })
  }
}