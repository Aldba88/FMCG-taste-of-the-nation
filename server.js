// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
