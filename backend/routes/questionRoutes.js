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
    const question = new Question({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image, // Include the image field
        tags: req.body.tags,
        postedBy: req.body.postedBy,
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

