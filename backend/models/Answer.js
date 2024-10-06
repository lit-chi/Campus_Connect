const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  files: [{ type: String }], // Array of file URLs (for attachments)
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Answer', answerSchema);
