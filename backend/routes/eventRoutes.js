const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Adjust the path as necessary

// Create a new event
router.post('/', async (req, res) => {
    const { description, image } = req.body;

    const newEvent = new Event({
        description,
        image,
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete an event by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
