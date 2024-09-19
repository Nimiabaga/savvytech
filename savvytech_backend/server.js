require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./middleware/authMiddleware'); // Commented out for now


const app = express();
const cors = require("cors");

// Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

// Apply authentication middleware to specific routes
app.use('/api/profile', authenticateToken);
app.use('/api/lessons', authenticateToken);

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);


// Connect to MongoDB
connectDB();

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
