import "./enrollment.scss";
import React, { useState, useEffect } from 'react';
import { enrollmentApiRequests } from '../../api';
import { useAuth } from '../context/AuthenticationContext';

const EnrollmentPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, user } = useAuth();

  const userId = isLoggedIn ? user.id : undefined;

  useEffect(() => {
    if (userId) {
      fetchEnrollments();
    }
  }, [userId]);

  const fetchEnrollments = async () => {
    try {
      setIsLoading(true);
      const response = (await enrollmentApiRequests.getEnrollment(userId)).data;
      setEnrollments(response.enrollment);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setError('Failed to fetch enrollments. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading enrollments...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="enrollment-page">
      <h2 className="page-title">Your Enrollments</h2>
      {enrollments.length === 0 ? (
        <p className="no-enrollments">You are not enrolled in any courses yet.</p>
      ) : (
        <ul className="enrollment-list">
          {enrollments.map((enrollment) => (
            <li key={enrollment._id} className="enrollment-item">
              <div className="course-info">
                <h3 className="course-title">{enrollment.courseId.title}</h3>
                <p className="course-description">{enrollment.courseId.description}</p>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${enrollment.progress}%` }}
                ></div>
                <span className="progress-text">{enrollment.progress}% Complete</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrollmentPage;
