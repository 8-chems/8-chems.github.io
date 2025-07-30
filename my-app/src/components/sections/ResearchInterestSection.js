import React, { useEffect, useState } from "react";

const ResearchInterestSection = () => {
  const [researchInterests, setResearchInterests] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/research_interests.json")
      .then((res) => res.json())
      .then((data) => setResearchInterests(data))
      .catch((err) => console.error("Failed to load research interests", err));
  }, []);

  return (
    <div className="page active" id="page-3">
      <h2 className="fw-bold mb-4 text-center text-primary" id="dev_skills">
        Research Interest
      </h2>

      <div className="space-y-6">
        {researchInterests.map(({ id, title, content }) => (
          <div key={id} className="card">
            <h3 className="card-title">
              <span>{title}</span>
            </h3>
            <ul className="card-content">
              {content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchInterestSection;
