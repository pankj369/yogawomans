// src/pages/LandingPage.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SacredOrbitSection from "../components/sacred-orbit/SacredOrbitSection";
import PalmistrySection from "../components/palmistry/PalmistrySection";

import AboutUs from "../components/AboutUs";  
import WhyChooseUs from "../components/WhyChooseUs";
import Instructors from "../components/Instructors";  
import ClassesSection from "../components/ClassesSection";
import FindSolution from "../components/FindSolution";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        {/* 1. HOOK — pehli impression */}
        <Hero />
        
        {/* Sacred Flow Orbital Animation */}
        <SacredOrbitSection />

        {/* AI Palmistry Experience */}
        <PalmistrySection />

        {/* 2. PROBLEM-SOLUTION — pain points address karo */}
        <FindSolution />


        {/* 3. CLASSES — detail mein offering */}
        <ClassesSection />


        {/* 4. TEAM — human face = trust */}
        <Instructors />
        
        {/* 5. WHO WE ARE — brand story + credibility */}
        <AboutUs />

          {/* 6. WHY US — competitors se alag kyun hain */}
          <WhyChooseUs />


        {/* 8. TESTIMONIALS — real reviews before final CTA */}
        <Testimonials />


      </main>
      {/* 9. Footer  */}
      <Footer />
    </div>
  );
}

export default LandingPage;
