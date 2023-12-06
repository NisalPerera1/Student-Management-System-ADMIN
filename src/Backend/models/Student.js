// /server/models/studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  contactNumber: Number,
  school: String,
  grade: String,
  gender: String,
  medium: String,
  image: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
