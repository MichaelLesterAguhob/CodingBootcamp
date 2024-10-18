
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
    return res.status(400).send({ message: 'Email invalid'});
  } else if(!isValidMobileNo(mobileNo)) {
    return res.status(400).send({ message: 'Mobile number is invalid'});
  } else if(!isValidPassword(password)) {
    return res.status(400).send({ message: 'Password must be atleast 8 characters' });
  }

	return newUser.save()
    .then((result) => res.status(201).send({ message: 'User successfully registered', result}))
    .catch(err => errorHandler(err, req, res))
};



module.exports.loginUser = (req, res) => {
  if(!req.body.email.includes('@')) {
    return res.status(400).send({ message: "Invalid email format" });
  }

  return User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) { 
        return res.status(404).send({ message: "Email does not exist" });
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
        return res.status(200).send(user);
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



module.exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const { id } = req.user; 

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports.updateProfile = async (req, res) => {
  try {

    const {id} = req.user;
    const { firstName, lastName, mobileNo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, mobileNo },
      { new: true }
    );

    res.status(200).send({message: "Updated Successfully", updatedUser});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update profile' });
  }
}


module.exports.updateUserByAdmin = async (req, res) => {
  const userId = req.body.id;

  if (!userId) {
      return res.status(400).send({ message: 'User ID is required.' });
  }

  try {
      const updatedUser = await User.findByIdAndUpdate(
          userId, {isAdmin: true}, { new: true} 
      );

      if (!updatedUser) {
          return res.status(404).send({ message: 'User not found.' });
      }

      return res.status(200).send({ message: 'User updated as admin successfully.' });
  } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Failed to update user.' });
  }
}

// Stretch Goal
module.exports.updateEnrollmentStatus = async (req, res) => {
    const userId = req.body.id;
    const enrollmentStatus = req.body.status;

    try {

      const updatedStatus = await Enrollment.findOneAndUpdate(
        {userId : userId}, {status: enrollmentStatus}, {new:true}
      )

      if (!updatedStatus) {
          return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).send({ message: 'User enrollment status updated successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Failed to update user enrollment status.' });
    }
    
}
