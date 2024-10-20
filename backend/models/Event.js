const mongoose = require('mongoose');

// Define the Event schema
const EventSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: true 
    },
    image: { // Field for image URL
        type: String, 
        required: true 
    },
});

module.exports = mongoose.model('Event', EventSchema);
