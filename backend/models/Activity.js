const mongoose = require('mongoose');

// Define the Activity schema
const ActivitySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['hackathon', 'internship', 'placement', 'volunteer'], // Enum for activity types
        required: true 
    },
    tags: [{ 
        type: String 
    }],  // Optional: for categorization/searching
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the user who created the activity
        required: true 
    }
});