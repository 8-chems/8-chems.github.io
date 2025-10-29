import React, { useEffect, useState } from "react";

const ExperienceSection = () => {
  const [academicExperiences, setAcademicExperiences] = useState([]);
  const [professionalExperiences, setProfessionalExperiences] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/experiencedata.json")
      .then((res) => res.json())
      .then((data) => {
        setAcademicExperiences(data.academic || []);
        setProfessionalExperiences(data.professional || []);
      })
      .catch((err) => console.error("Failed to load experience data:", err));
  }, []);

  const renderExperience = ({ id, title, year, content }) => (
    <div key={id} className="mb-4">
      <h4 className="text-dark fw-semibold">
        {title} <span className="text-primary">({year})</span>
      </h4>
      <p className="text-muted" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );

  return (
    <div className="page active" id="page-4">
      <h2 className="fw-bold text-primary mb-4 text-center" id="experiences_section">
        Experiences
      </h2>

      {/* Academic Experiences Section */}
      <div className="mb-5">
        <h3 className="text-secondary mb-3">Academic Experiences</h3>
        <div className="description">
          {academicExperiences.map(renderExperience)}
        </div>
      </div>

      <hr style={{ border: "1px solid #ddd", margin: "40px 0" }} />

      {/* Professional Experiences Section */}
      <div>
        <h3 className="text-secondary mb-3">Professional Experiences</h3>
        <div className="description">
          {professionalExperiences.map(renderExperience)}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
