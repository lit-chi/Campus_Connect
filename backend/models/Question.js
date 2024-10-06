const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // Field for storing image URL or path
  tags: [{ type: String }], // Array of tags for categorizing questions
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionSchema);