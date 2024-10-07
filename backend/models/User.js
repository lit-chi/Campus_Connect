const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Required but not unique
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true }, // Unique roll number
  profilePicture: { type: String }, // Optional profile picture URL
  dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);

