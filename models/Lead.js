// models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Lead', leadSchema);
