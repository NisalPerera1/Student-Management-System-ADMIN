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
router.put('/:id', studentController.updateStudentById);

// Delete student by ID
router.delete('/:id', studentController.deleteStudentById);


router.get('/search/students/:query', async (req, res) => {
    const query = req.params.query;
  
    try {
      const students = await Student.find({
        $or: [
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } },
        ],
      });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
