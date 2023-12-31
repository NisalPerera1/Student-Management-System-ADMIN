// /server/controllers/studentController.js
const Student = require('../models/Student');

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, address, contactNumber, school, grade, gender, medium, image } = req.body;
    const student = new Student({ firstName, lastName, address, contactNumber, school, grade, gender, medium, image });

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
  const allowedUpdates = ['firstName', 'lastName', 'address', 'contactNumber', 'school', 'grade', 'gender', 'medium', 'image'];

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    console.log(`Updating student with ID: ${req.params.id}`);
    console.log('Fields to update:', updates);

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    // Update only the allowed fields that exist in the request
    allowedUpdates.forEach((update) => {
      if (req.body[update] !== undefined) {
        student[update] = req.body[update];
      }
    });

    // Save the updated student
    await student.save();

    // Log a success message
    console.log('Student updated successfully');

    // Return the updated student in the response
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    // Log the error
    console.error('Error updating student:', error);
    console.log('Request body:', req.body);
console.log('Fields to update:', updates);

    res.status(500).json({ error: 'Internal Server Error' });
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
