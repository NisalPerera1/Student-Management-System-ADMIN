const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

  // Required Inputs
  firstName: String,
  lastName: String,
  address :String,
  contactNumber:Number,

  // Additional Details (Not required)
  school: String,
  grade : String,
  gender: String,

  medium: String,
  image: String,


});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;


