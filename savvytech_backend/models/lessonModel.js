const mongoose = require('mongoose');

// Define the lesson schema
const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    order: {
        type: Number,
        required: true
    }
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt fields

// Export the model only if it does not already exist
module.exports = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);
