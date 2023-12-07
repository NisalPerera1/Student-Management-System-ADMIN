const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
