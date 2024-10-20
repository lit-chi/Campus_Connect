const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // Ensure the path is correct

// GET all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().populate('postedBy', 'username'); // Populate postedBy for username
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new question
router.post('/', async (req, res) => {
    const { title, tags, postedBy } = req.body;

    // Check for required fields
    if (!title || !postedBy) {
        return res.status(400).json({ message: 'Title and postedBy are required.' });
    }

    const question = new Question({
        title,
        tags, // Include tags
        postedBy, // This should be the ObjectId of the user posting the question
    });

    try {
        const savedQuestion = await question.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Other routes (PUT, DELETE) can be defined similarly

module.exports = router;
