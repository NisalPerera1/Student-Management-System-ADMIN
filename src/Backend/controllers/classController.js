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
    const classes = await Class.findById(req.params.id);
    if (!classes) {
      return res.status(404).send({ error: 'Class not found' });
    }
    res.send(classes);
  } catch (error) {
    res.status(500).send(error);
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


const assignStudentsToClass = async (req, res) => {
  const { id } = req.params;
  const { students } = req.body;

  try {
    // Find the class by ID and update the assigned students
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { $set: { assignedStudents: students } },
      { new: true }
    );

    res.json({ message: 'Students assigned successfully', updatedClass });
  } catch (error) {
    console.error('Error assigning students to class:', error);
    res.status(500).json({ error: 'Error assigning students to class' });
  }
};


const removeAllStudentsFromClass = async (req, res) => {
  const classId = req.params.id;

  try {
    console.log('Removing all students from class with ID:', classId);

    // Find the class by ID
    const foundClass = await Class.findById(classId);

    if (!foundClass) {
      console.log('Class not found');
      return res.status(404).json({ error: 'Class not found' });
    }

    // Log the current assigned students
    console.log('Current assigned students:', foundClass.assignedStudents);

    // Remove all students from the class
    foundClass.assignedStudents = [];

    // Log the updated assigned students before saving
    console.log('Updated assigned students:', foundClass.assignedStudents);

    // Save the updated class
    await foundClass.save();

    console.log('All students removed successfully');

    // Respond with success
    return res.status(200).json({ message: 'All students removed successfully' });
  } catch (error) {
    console.error('Error removing all students:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClassById,
  deleteClassById,
  assignStudentsToClass,
  removeAllStudentsFromClass
};
