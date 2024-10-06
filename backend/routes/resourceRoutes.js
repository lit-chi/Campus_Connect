const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource'); // Assuming you have a Resource model

// GET all resources
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new resource
router.post('/', async (req, res) => {
    const resource = new Resource({
        title: req.body.title,
        description: req.body.description,
        document: req.body.document, // For the document field
        // Add other fields as necessary
    });

    try {
        const savedResource = await resource.save();
        res.status(201).json(savedResource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Other routes can be defined similarly

module.exports = router;
