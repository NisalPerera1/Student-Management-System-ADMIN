const Class = require('../models/Class');

// Controller to create a new class
const createClass = async (req, res) => {
  try {
    const { name, day, time, location, contactNumber, grade, medium, fee } = req.body;

    const newClass = new Class({
      name,
      day,
      time,
      location,
      contactNumber,
      grade,
      medium,
      fee,
    });

    const savedClass = await newClass.save();
    res.json(savedClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ error: 'Error creating class' });
  }
};

// Controller to get all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Error fetching classes' });
  }
};

// Controller to get a class by ID
const getClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const foundClass = await Class.findById(classId);
    res.json(foundClass);
  } catch (error) {
    console.error('Error fetching class by ID:', error);
    res.status(500).json({ error: 'Error fetching class by ID' });
  }
};

// Controller to update a class by ID
const updateClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const { name, day, time, location, contactNumber, grade, medium, fee } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        name,
        day,
        time,
        location,
        contactNumber,
        grade,
        medium,
        fee,
      },
      { new: true }
    );

    res.json(updatedClass);
  } catch (error) {
    console.error('Error updating class by ID:', error);
    res.status(500).json({ error: 'Error updating class by ID' });
  }
};

// Controller to delete a class by ID
const deleteClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    await Class.findByIdAndDelete(classId);
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting class by ID:', error);
    res.status(500).json({ error: 'Error deleting class by ID' });
  }
};


module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClassById,
  deleteClassById,
  assignStudentToClass,
};
