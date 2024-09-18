// TestimonialsSection.jsx
import React from "react";

const TestimonialsSection = () => {
  return (
    <section className="testimonials">
      <h2>What Our Students Say</h2>
      <div className="testimonial-list">
        {[
          { text: "This platform helped me land my dream job!", name: "Jane Doe" },
          { text: "The courses are well-structured and easy to follow.", name: "John Smith" }
        ].map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <p>"{testimonial.text}"</p>
            <h4>— {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
