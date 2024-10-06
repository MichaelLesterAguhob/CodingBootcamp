
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
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

  const isValidMobileNo = (mobileNo) => {
    return mobileNo.length === 11;
  };

  const isValidEmail = (email) => {
    return email.includes('@');
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const { firstName, lastName, email, mobileNo, password } = req.body;

  if(!isValidEmail(email)) {
    return res.status(400).send({ message: 'Invalid email format.'});
  } else if(!isValidMobileNo(mobileNo)) {
    return res.status(400).send({ message: 'Mobile number is invalid.'});
  } else if(!isValidPassword(password)) {
    return res.status(400).send({ message: 'Password must be atleast 8 characters long.' });
  }

	return newUser.save()
    .then((result) => res.status(201).send({ message: 'User registered successfully', result}))
    .catch(err => errorHandler(err, req, res))
};



module.exports.loginUser = (req, res) => {
  if(!req.body.email.includes('@')) {
    return res.status(400).send({ message: "Invalid email format" });
  }

  return User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) { 
        return res.status(404).send({ message: "No email found" });
      } else {

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
        if (isPasswordCorrect) {
		        return res.status(200).send({ message: "User logged in successfully", access : auth.createAccessToken(result)});
        } else {
            return res.status(401).send({ message: "Incorrect email or password" });
        }

      }
    })
    .catch((err) => errorHandler(err, req, res));
};



module.exports.checkEmailExists = (req, res) => {
  if(req.body.email.includes('@')){
    return User.find({ email : req.body.email })
    .then(result => {

        if (result.length > 0) {
            return res.status(409).send({message: 'Duplicate Email found'});
        } else {
            return res.status(404).send({message: 'No duplicate email found'});
        };
    })
    .catch((err) => errorHandler(err, req, res));
  } else {
    return res.status(400).send({message: 'Invalid email format'});
  }
};


module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id).then(user => {
        if(!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.password = "";
        return res.status(200).send({user});
    })
    .catch(err => errorHandler(err, req, res))
};



module.exports.enroll = (req, res) => {
    if(req.user.isAdmin) {
      return res.status(403).send({message : 'Admin is forbidden'});
    }
    let newEnrollment = new Enrollment({
      userId: req.user.id,
      enrolledCourses: req.body.enrolledCourses,
      totalPrice: req.body.totalPrice
    })
    return newEnrollment.save().then(enrolled => res.status(201).send({ success: true, message: 'Enrolled successfully' })).catch(err => errorHandler(err, req, res));
};



module.exports.getEnrollments = (req, res) => {
    return Enrollment.find({ userId: req.user.id })
    .then((result) => {
      if (!result) {
        res.status(401).send({message: 'No Enrollments found' });
      } else {
        res.status(200).send({result});
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

