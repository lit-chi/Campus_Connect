const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Route to get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new resource
router.post('/', async (req, res) => {
  const { title, description, url } = req.body;

  // Create a new resource object
  const resource = new Resource({
    title,
    description,
    url, // URL for downloading the resource
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

