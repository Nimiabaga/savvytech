// CoursesSection.jsx
import React from "react";

const CoursesSection = () => {
  return (
    <section className="courses">
      <h2>Popular Courses</h2>
      <div className="course-list">
        {["Web Development", "Data Science", "Graphic Design"].map((course, index) => (
          <div key={index} className="course-item">
            <h3>{course}</h3>
            <p>Learn to build modern web applications from scratch.</p>
          </div>
        ))}
      </div>
      <button className="view-all-button">View All Courses</button>
    </section>
  );
};

export default CoursesSection;
