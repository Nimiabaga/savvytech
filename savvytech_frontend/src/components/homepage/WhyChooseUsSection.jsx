// WhyChooseUsSection.jsx
import React from "react";

const WhyChooseUsSection = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Our Platform?</h2>
      <div className="features">
        {[
          { title: "Expert Instructors", description: "Learn from industry professionals." },
          { title: "Flexible Learning", description: "Access courses anytime, anywhere." },
          { title: "Certificates", description: "Boost your resume and career." }
        ].map((feature, index) => (
          <div key={index} className="feature-item">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
