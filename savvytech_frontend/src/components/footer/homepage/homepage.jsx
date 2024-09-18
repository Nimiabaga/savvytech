// Homepage.jsx
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
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default Homepage;
