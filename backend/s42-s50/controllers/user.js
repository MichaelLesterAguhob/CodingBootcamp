
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
// use the "require" directive to load bcryptjs module/package that allows us to encrypt information
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.registerUser = (req, res) => {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      password: bcrypt.hashSync(req.body.password, 10),
  });

	return newUser.save()
    .then((result) => res.status(201).send(result))
    .catch(err => errorHandler(err, req, res))
};


module.exports.loginUser = (req, res) => {
  if(req.body.email.includes('@')) {
  return User.findOne({ email: req.body.email }).then((result) => {
      if (!result) {
        return res.status(404).send(false);
      } else {
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,result.password);
        if (isPasswordCorrect) {
		        return res.status(200).send({ access : auth.createAccessToken(result)});
        } else {
			return res.status(401).send(false);
        }
      }
    })
    .catch((err) => errorHandler(err, req, res));
  } else {
    return res.status(400).send(false);
  }
};

// Activity: Check if the email already exists
module.exports.checkEmailExists = (req, res) => {

    if(req.body.email.includes('@')) {
      return User.find({ email : req.body.email })
      .then(result => {

          if (result.length > 0) {
              return res.status(409).send(true);
          } else {
              return res.status(404).send(false);
          };
      })
      .catch((err) => errorHandler(err, req, res));
  } else {
    return res.status(400).send(false);
  }
};


module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id).then(result => {
        result.password = "";
        return res.status(200).send(result);
    })
    .catch(err => errorHandler(err, req, res))
};

module.exports.enroll = (req, res) => {
	if(req.user.isAdmin) {
		return res.status(403).send(false);
	}
	let newEnrollment = new Enrollment({
		userId: req.user.id,
		enrolledCourses: req.body.enrolledCourses,
		totalPrice: req.body.totalPrice
	})
	return newEnrollment.save().then(enrolled => res.status(201).send(true)).catch(err => errorHandler(err, req, res));
}

module.exports.getEnrollments = (req, res) => {
	return Enrollment.find({userId: req.user.id}).then(result => {
		if(!result) {
			res.status(401).send(false)
		} else {
			res.status(200).send(result)
		}
	}).catch(err => errorHandler(err, req, res));
}

