const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // Assuming you have a Question model

// GET all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new question
router.post('/', async (req, res) => {
    // Ensure the required fields are provided
    const { content, title, image, tags, postedBy } = req.body;

    // Check for required fields
    if (!content || !postedBy) {
        return res.status(400).json({ message: 'Content and postedBy are required.' });
    }

    const question = new Question({
        title,
        content,
        image, // Include the image field
        tags,
        postedBy, // This should be the ObjectId of the user posting the question
    });

    try {
        const savedQuestion = await question.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Other routes (GET, PUT, DELETE) can be defined similarly

module.exports = router;


