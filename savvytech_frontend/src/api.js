import axios from "axios";

const ServerUrl = "http://172.20.10.2:5000/api";

// Create separate Axios instances with different base URLs
const globalApi = axios.create({
  baseURL: ServerUrl,
  withCredentials: true,
});

// Define your API routes
const authRoutes = {
  login: "/users/login",
  createUser: "/users/register",
  // Add more authentication routes as needed
};

//Define enrollmentRoutes
const enrollmentRoutes = {
  getEnrollment: (userId) => `/enrollments/${userId}`,
  createEnrollment: '/enrollments',
  dropEnrollment: '/enrollments',
};


// Add Course Routes
const courseRoutes = {
  createCourse: "/courses",
  getCourses: "/courses",
  getCourseById: (id) => `/courses/${id}`,
  updateCourse: (id) => `/courses/${id}`,
  deleteCourse: (id) => `/courses/${id}`,
};


// API requests for Courses
const courseApiRequests = {
  createCourse: async (data) => {
    return await globalApi.post(courseRoutes.createCourse, data);
  },
  getCourses: async () => {
    return await globalApi.get(courseRoutes.getCourses);
  },
  getCourseById: async (id) => {
    return await globalApi.get(courseRoutes.getCourseById(id));
  },
  updateCourse: async (id, data) => {
    return await globalApi.put(courseRoutes.updateCourse(id), data);
  },
  deleteCourse: async (id) => {
    return await globalApi.delete(courseRoutes.deleteCourse(id));
  },
};

// Functions to make API requests for authentication
const authApiRequests = {
  loginUser: async (email, password) => {
    return await globalApi.post(authRoutes.login, { email, password });
  },
  createUser: async (data) => {
    return await globalApi.post(authRoutes.createUser, data);
  },
  // Add more functions for other authentication routes
};


// API requests for Enrollments
const enrollmentApiRequests = {
  getEnrollment: async (userId) => {
    return await globalApi.get(enrollmentRoutes.getEnrollment(userId));
  },
  createEnrollment: async (data) => {
    return await globalApi.post(enrollmentRoutes.createEnrollment, data);
  },
  dropEnrollment: async (data) => {
    return await globalApi.delete(enrollmentRoutes.dropEnrollment, { data });
  },
};


export { authApiRequests, enrollmentApiRequests, courseApiRequests };
