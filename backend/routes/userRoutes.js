const express = require('express');
const User = require('../models/User'); // Ensure this path is correct based on your project structure
const router = express.Router();

// POST endpoint to create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); // Save the user to the database
        res.status(201).json(newUser); // Return the created user
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return an error message if validation fails
    }
});

// GET endpoint to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users); // Return the list of users
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return an error message if something goes wrong
    }
});

// GET endpoint for fetching a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId); // Find the user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }
        res.json(user); // Return the found user
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return an error message if something goes wrong
    }
});

// PUT endpoint for updating a user
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }); // Update the user
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }
        res.json(updatedUser); // Return the updated user
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return an error message if validation fails
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // For now, we are comparing plain text passwords (you can later hash them for security)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Return both the user ID and the username
        res.status(200).json({ message: 'Login successful', user: { _id: user._id, username: user.username }});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;



