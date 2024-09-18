const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Create a new lesson
router.post('/lessons', lessonController.createLesson);

// Get a lesson by ID
router.get('/lessons/:id', lessonController.getLessonById);

// Update a lesson
router.put('/lessons/:id', lessonController.updateLesson);

// Delete a lesson
router.delete('/lessons/:id', lessonController.deleteLesson);

// Get lessons for a specific course
router.get('/courses/:courseId/lessons', (req, res) => {
    // Implementation logic for retrieving lessons for the course
});

module.exports = router
