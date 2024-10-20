const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Question', // Reference to the Question model
  },
  postedBy: {
    type: String, // Store the username of the user who posted the answer
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

// Export the Answer model
const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;

