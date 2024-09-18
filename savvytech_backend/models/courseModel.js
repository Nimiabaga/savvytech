const mongoose = require('mongoose');

// Define the course schema
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // Removed 'required' from instructorId
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional now
    }
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt fields

// Export the model
module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
