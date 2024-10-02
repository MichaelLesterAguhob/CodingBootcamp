
const Course = require('../models/Course');


module.exports.getAllCourses = () => {

    return Course.find({}).then(result => {
        return result
    })
};

// Michael
module.exports.addCourse = (req, res) => {
    let newCourse = Course({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        isActive: req.body.isActive,
        createdOn: req.body.createdOn
    });
 
    return newCourse.save()
    .then(result => res.send(result))
    .catch(err => err);
}
// End of Michael

