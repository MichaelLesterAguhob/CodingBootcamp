
const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'UserID is Required']
  },
  enrolledCourses: [
    {
      courseId: {
        type: String,
        required: [true, 'CourseID is required']
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: [true, 'Price is required']
  },
  enrolledOn: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Enrolled"
  }
});