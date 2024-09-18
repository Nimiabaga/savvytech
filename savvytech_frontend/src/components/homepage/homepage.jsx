import React from "react";
import HeroSection from "./HeroSection";
import CoursesSection from "./CoursesSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import TestimonialsSection from "./TestimonialsSection";
import CallToActionSection from "./CallToActionSection";
import "./homepage.scss";

const Homepage = () => {
  return (
    <div className="homepage">
      <HeroSection />
      <CoursesSection />
      <WhyChooseUsSection 
        title="Why Choose Savvy Tech Creators?" 
        description="Savvy Tech Creators is your go-to platform for mastering content creation tools. Learn from expert instructors, enhance your skills, and bring your creative ideas to life."
      />
      <TestimonialsSection 
        title="What Our Learners Say" 
        testimonials={[
          { name: "Alex", review: "The Canva course transformed the way I create social media content. Highly recommended!" },
          { name: "Sarah", review: "Mastering Animaker was easy and fun thanks to Savvy Tech Creators!" },
          { name: "James", review: "I never knew whiteboard animations could be this simple until I took the VideoScribe course." }
        ]}
      />
      <CallToActionSection 
        title="Ready to Create?" 
        buttonText="Start Learning Today" 
        description="Join thousands of learners and take your content creation skills to the next level with our expert-led courses."
      />
    </div>
  );
};

export default Homepage;
