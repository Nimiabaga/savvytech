//App.js
import Home from "./pages/home/Home";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/signupPage";
import LoginPage from "./pages/login/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/context/AuthenticationContext";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./style/style.scss";
import Course from "./components/courses/courses";
import EnrollmentPage from "./components/enrollment/enrollment";

// Main App component
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <AuthProvider>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />

              {/* Sign-up page */}
              <Route path="sign-up" element={<SignupPage />} />

              {/* Login page */}
              <Route path="login" element={<LoginPage />} />

              {/* Courses page */}
              <Route path="courses" element={<Course />} />

              {/* Enrollment page with dynamic userId */}
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
