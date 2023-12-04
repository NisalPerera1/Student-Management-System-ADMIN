// /server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes'); // New

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Student-Managegement-System', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/students', studentRoutes); // New

// Sample Route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
