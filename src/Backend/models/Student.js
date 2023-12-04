// /server/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  image: String,
  // Add more fields as needed
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
