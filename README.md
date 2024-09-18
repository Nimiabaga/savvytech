# SavvyTech Creators

SavvyTech Creators is a web-based learning platform designed to provide users with easy access to a wide range of content creation courses, utilizing tools like Canva, AI tools, InVideo.ai, Animaker, VideoScribe, and CapCut. This platform enables learners to explore content creation skills and monetize them, fostering creativity and self-sufficiency in a digital world.

This README provides an overview of the project structure, files, and functionality for both the backend and frontend components of the application.

## Project Structure

The project is divided into two main sections:
- Backend (server-side) – built using Node.js, Express, MongoDB, and other dependencies.
- Frontend (client-side) – built using React.js, SCSS, and various components for routing and rendering different pages.

### Backend

#### `server.js`
The backend server (`server.js`) is the core of the application's API. It handles user authentication, course management, lesson management, and enrollments. The application also integrates MongoDB for database management and uses middleware for JSON parsing, cookies, and CORS configuration.

**Key Features:**
- **Environment Configuration:** The app uses `dotenv` to load environment variables from the `.env` file.
- **Express Setup:** The app is built on Express, which handles routing and middleware for the API.
- **Database:** MongoDB is used as the database, connected using the `connectDB` function.
- **Routes:** Different routes are defined for handling user-related actions, courses, lessons, and enrollments.
  - `/api/users` – User-related actions (registration, login, etc.)
  - `/api/courses` – Course management (create, update, delete)
  - `/api/lessons` – Lesson management within courses
  - `/api/enrollments` – Managing user enrollments in courses
- **Middleware:** The app uses several middlewares, including `cookieParser` for handling cookies and CORS to allow cross-origin resource sharing. The authentication middleware (`authenticateToken`) is currently commented out for some routes but will be used to secure certain actions.
  
**Backend File Structure:**
- **Routes:** Routes for users, courses, lessons, and enrollments are handled in separate files:
  - `userRoutes.js`
  - `courseRoutes.js`
  - `lessonRoutes.js`
  - `enrollmentRoutes.js`
- **Middleware:** Custom middleware like `authMiddleware.js` ensures that authenticated users can access protected routes.

```javascript
require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);

connectDB();
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
```

### Frontend

#### `App.js`
The frontend is a React-based application that manages the user interface and routes for different parts of the site. Users can sign up, log in, view available courses, and manage their enrollments. It uses `react-router-dom` for routing and the `Toastify` library for notifications.

**Key Features:**
- **Dark Mode Support:** The app integrates a dark mode feature, allowing users to switch between light and dark themes based on their preferences.
- **Authentication Context:** The `AuthProvider` component manages user authentication and makes the auth state available throughout the app.
- **Routing:** The app uses `BrowserRouter` to define routes for the homepage, signup, login, courses, and enrollment pages.
  - `/sign-up` – User sign-up page
  - `/login` – User login page
  - `/courses` – Displays a list of available courses
  - `/enrollments/:userId` – Displays the user's enrollments

```javascript
import Home from "./pages/home/Home";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/signupPage";
import LoginPage from "./pages/login/LoginPage";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/context/AuthenticationContext";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Course from "./components/courses/courses";
import EnrollmentPage from "./components/enrollment/enrollment";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <AuthProvider>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="sign-up" element={<SignupPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="courses" element={<Course />} />
              <Route path="enrollments/:userId" element={<EnrollmentPage />} />
            </Route>
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
```

**Frontend File Structure:**
- **Pages:** Separate components for the homepage (`Home`), signup (`SignupPage`), login (`LoginPage`), courses (`Course`), and enrollments (`EnrollmentPage`).
- **Context:** `AuthenticationContext` manages the state of user authentication across the app, and `DarkModeContext` controls theme settings.
- **Styles:** The app uses `.scss` files for styling, with dynamic theme-based CSS for dark and light modes.

## Installation and Setup

### Prerequisites:
- Node.js 
- MongoDB

### Backend Setup:
1. Clone the repository and navigate to the backend folder.
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with the required environment variables (MongoDB URI, etc.).
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup:
1. Navigate to the frontend folder.
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```
## Author
- JULIE PETERS
