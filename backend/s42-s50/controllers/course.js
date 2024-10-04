const Course = require("../models/Course");
const { errorHandler } = require("../auth");

module.exports.addCourse = (req, res) => {
  let newCourse = new Course({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  Course.findOne({ name: req.body.name }).then((existingCourse) => {
      if (existingCourse) {
        return res.status(409).send(true);
      } else {
        return newCourse
          .save()
          .then((result) => res.status(201).send(result))
          .catch((err) => errorHandler(err, req, res));
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getAllCourses = (req, res) => {
  return Course.find({})
    .then((result) => res.status(200).send(result))
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getAllActive = (req, res) => {
  Course.find({ isActive: true }).then((result) => {
    if(result.length > 0){
      res.status(200).send(result)
    } else {
      res.status(404).send(false)
    }
  }).catch((err) => errorHandler(err, req, res));
};

module.exports.getCourse = (req, res) => {
  return Course.findById(req.params.id)
    .then((course) => res.status(200).send(course))
    .catch((err) => errorHandler(err, req, res));
};

module.exports.updateCourse = (req, res) => {
  let updatedCourse = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  return Course.findByIdAndUpdate(req.params.id, updatedCourse)
    .then((course) => {
      if (course) {
        res.status(202).send(true);
      } else {
        res.status(404).send(false);
      }
    })
    .catch((error) => errorHandler(error, req, res));
};

module.exports.archiveCourse = (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      if (!course) {
        return res.status(404).send(false);
      } else {
        course.isActive = false;
        return course
          .save()
          .then((result) => res.status(200).send(true))
          .catch((err) => errorHandler(err, req, res));
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.activateCourse = (req, res) => {
  let updateActiveField = {
    isActive: true,
  };

  return Course.findByIdAndUpdate(req.params.id, updateActiveField)
    .then((course) => {
      if (course) {
        res.status(200).send(true);
      } else {
        res.status(400).send(false);
      }
    })
    .catch((error) => errorHandler(error, req, res));
};
