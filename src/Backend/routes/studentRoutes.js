// /server/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Create a new student
router.post('/create', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Get student by ID
router.get('/:id', studentController.getStudentById);

// Update student by ID
router.patch('/:id', studentController.updateStudentById);

// Delete student by ID
router.delete('/:id', studentController.deleteStudentById);

module.exports = router;
