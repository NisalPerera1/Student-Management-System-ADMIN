// /server/controllers/studentController.js
const Student = require('../models/Student');

// Create a new student
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update student by ID
const updateStudentById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'image'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete student by ID
const deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
