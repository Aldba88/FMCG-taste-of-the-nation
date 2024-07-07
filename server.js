// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Lead = require('./models/Lead');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  console.log('Form Data:', req.body); // Log form data
  const { fullName, company, email } = req.body;

  try {
    const lead = new Lead({ fullName, company, email });
    await lead.save();
    console.log(`Lead saved: ${fullName}, ${company}, ${email}`);
    res.send('<h1>Thank you for your submission!</h1><p>Your report is ready to download: <a href="/path/to/your/pdf/file.pdf" download>Download PDF</a></p>');
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the app for Vercel
module.exports = app;
