import React from "react";

const CoursesSection = () => {
  const courses = [
    {
      title: "Introduction to Canva",
      description: "Master the basics of Canva and create stunning visual content effortlessly.",
    },
    {
      title: "Whiteboard Animations with VideoScribe",
      description: "Learn how to create engaging whiteboard animations using VideoScribe.",
    },
    {
      title: "Mastering Animaker",
      description: "Become an expert in Animaker and create professional-level animations.",
    },
  ];

  return (
    <section className="courses">
      <h2>Popular Courses</h2>
      <div className="course-list">
        {courses.map((course, index) => (
          <div key={index} className="course-item">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
      <button className="view-all-button">View All Courses</button>
    </section>
  );
};

export default CoursesSection;
