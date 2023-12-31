const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes');
const { google } = require('googleapis');
const open = require('open');

const app = express();
const PORT = process.env.PORT || 5000;

try {
  const credentials = require('../Assets/googlecalender/credentials.json');
  const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

  // Check if credentials and credentials.web exist before accessing redirect_uris
  if (credentials && credentials.web) {
    const oAuth2Client = new google.auth.OAuth2(
      credentials.web.client_id,
      credentials.web.client_secret,
      credentials.web.redirect_uris
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    app.get('/auth', (req, res) => {
      open(authUrl).then(() => {
        res.send('Authorization URL opened in default browser.');
      }).catch((error) => {
        console.error('Error opening authorization URL:', error);
        res.status(500).send('Internal Server Error');
      });
    });

    app.get('/auth/callback', async (req, res) => {
      const code = req.query.code;
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        res.send('Authentication successful!');
      } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  } else {
    console.error('Error: credentials or credentials.web is undefined');
  }
} catch (error) {
  console.error('Error loading credentials:', error);
}

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
app.use('/students', studentRoutes);
app.use('/classes', classRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
