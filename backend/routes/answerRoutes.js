const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer'); // Adjust the path as necessary

// Get answers for a specific question
router.get('/:questionId', async (req, res) => {
    try {
      const questionId = req.params.questionId.trim(); // Trim whitespace
      const answers = await Answer.find({ questionId });
      res.json(answers);
    } catch (error) {
      console.error("Error fetching answers:", error); // Log the actual error
      res.status(500).json({ message: 'Error fetching answers', error: error.message });
    }
  });
  

// Post a new answer
router.post('/', async (req, res) => {
  const { questionId, postedBy, text } = req.body;

  const answer = new Answer({
    questionId,
    postedBy,
    text,
  });

  try {
    const newAnswer = await answer.save();
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
