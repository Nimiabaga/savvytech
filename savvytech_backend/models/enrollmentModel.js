const mongoose = require('mongoose');

// Define the enrollment schema
const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    progress: {
        type: Number,
        default: 0 // Track progress as a percentage
    },
    completionStatus: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt fields

module.exports = mongoose.model('Enrollment', enrollmentSchema);
