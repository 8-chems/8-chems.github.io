
import './css/components.css'
import './css/layout.css'
import './css/responsive.css'
import './css/base.css'
import './css/pdfviewer.css'

import './css/contact.css'
import './css/logo.css'

import React, { useState } from 'react';

import Header from "./components/Header";
import NavBar from "./components/NavBar";

import Footer from "./components/Footer";
import Breadcrumb from "./components/sections/BreadCrumb"

import BiographySection from "./components/sections/BiographySection"
import EducationSection from "./components/sections/EducationSection"
import ResearchWorkSection from "./components/sections/ResearchWorkSection"
import ResearchInterestSection from "./components/sections/ResearchInterestSection"

import ExperienceSection from "./components/sections/ExperienceSection"
import HardSkills from "./components/sections/HardSkillsSection"
import Projects from "./components/sections/ProjectsSection"
import NewsSection from "./components/sections/NewsSection"

import CVSection from "./components/sections/CVSection"
import ContactSection from './components/ContactSection';









function App() {
 
  // State to track the active section
  const [activeSection, setActiveSection] = useState('Biography'); // Default active section is 'home'

  // Function to handle navbar button click
  const handleNavClick = (section = 'Biography') => {
    setActiveSection(section);
  };
  return (
    <div>
      <NavBar onNavClick={handleNavClick} />
 <Header />
      

        <div className="content-wrapper" style={{ marginTop: '70px' }}>

          {/*activeSection != 'Lectures' && <Breadcrumb />*/}

          <main id="content">
            {activeSection === 'Biography' && <BiographySection />}
            {activeSection === 'Education' && <EducationSection />}
            {activeSection === 'Research Work' && <ResearchWorkSection />}
            {activeSection === 'Research Interest' && <ResearchInterestSection />}
            {activeSection === 'Experiences' && <ExperienceSection />}
            {activeSection === 'Skills' && <HardSkills />}
            {activeSection === 'Projects' && <Projects />}
            {activeSection === 'News' && <NewsSection />}

            {activeSection === 'CV' && <CVSection />}
            {activeSection === 'Contact' && <ContactSection />}

          </main>

        </div>
      

      <Footer isFullWidth={activeSection === 'Lectures' ? true : false} />
    </div>
  );
}

export default App;
