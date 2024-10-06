const express = require('express');
const router = express.Router();

// Sample GET route for fetching activities
router.get('/', (req, res) => {
    res.send('Fetch all activities');
});

// Sample POST route for creating a new activity
router.post('/', (req, res) => {
    const newActivity = req.body; // Assume the activity details are sent in the body
    // Logic to save the activity to the database would go here
    res.status(201).send(newActivity); // Sending back the created activity
});

// You can define more routes as needed...

module.exports = router;
