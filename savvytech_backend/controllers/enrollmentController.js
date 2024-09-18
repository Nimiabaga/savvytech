const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');
const User = require('../models/User');

// Enroll a user in a course
exports.enrollUser = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Check if the user and course exist
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);
        
        if (!user || !course) {
            return res.status(404).json({ message: 'User or Course not found' });
        }

        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'User is already enrolled in this course' });
        }

        // Create a new enrollment
        const newEnrollment = new Enrollment({ userId, courseId });
        await newEnrollment.save();

        res.status(201).json({ message: 'User enrolled successfully', enrollment: newEnrollment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to enroll user', error: error.message });
    }
};


// Get all enrollments for a user
exports.getEnrollments = async (req, res) => {
    try {
        const { userId } = req.params;

        // Retrieve all enrollments for the user
        const enrollments = await Enrollment.find({ userId }).populate('courseId', 'title description');
        
        if (!enrollments.length) {
            return res.status(404).json({ message: 'No enrollments found for this user' });
        }

        res.status(200).json({message: 'success', enrollment: enrollments});
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve enrollments', error: error.message });
    }
};

// Drop a user from a course
exports.dropCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Remove the enrollment
        const result = await Enrollment.deleteOne({ userId, courseId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        res.status(200).json({ message: 'User dropped from course successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to drop user from course', error: error.message });
    }
};
