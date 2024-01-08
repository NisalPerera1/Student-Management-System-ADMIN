const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const Class = require('../models/Class');

router.post('/create', classController.createClass);
router.get('/', classController.getAllClasses);

router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClassById);
router.delete('/:id', classController.deleteClassById);




router.get('/search/class', async (req, res) => {

  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query parameter (q) is required' });
    }

    // Use a regular expression with case-insensitive matching
    const regex = new RegExp(q, 'i');
    const classes = await Class.find({ name: { $regex: regex } });

    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
