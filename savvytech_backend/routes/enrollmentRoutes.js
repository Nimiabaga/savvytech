const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// Enroll user in a course
router.post('/', enrollmentController.enrollUser);

// Get all enrollments for a user
router.get('/:userId', enrollmentController.getEnrollments);

// Drop a course
router.delete('/', enrollmentController.dropCourse);

module.exports = router;
