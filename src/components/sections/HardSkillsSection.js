import React, { useEffect, useState } from "react";

const HardSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/hardskills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Failed to load skills.json", err));
  }, []);

  const getColor = (level) => {
    if (level >= 8) return "#51cf66";     // Green
    if (level >= 5) return "#fcc419";     // Yellow
    return "#ff6b6b";                     // Red
  };

  return (
    <div className="page active px-3 py-5" id="page-6">
      <h2 className="fw-bold mb-5 text-center text-primary" id="dev_skills">
        
      </h2>

      {skills.map((skill, index) => (
        <div key={index} className="mb-5">
          <h4 className="fw-semibold mb-3 text-dark">{skill.title}</h4>
          <div className="d-flex flex-column gap-3">
            {skill.tools.map((tool, toolIndex) => (
              <div key={toolIndex}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark fw-medium"
                  >
                    {tool.name}
                  </a>
                  <span className="small text-muted">{tool.level}/10</span>
                  
                </div>
                <div style={{
                  height: "8px",
                  background: "#e9ecef",
                  borderRadius: "5px",
                  overflow: "hidden"
                }}>
                  <div
                    style={{
                      width: `${tool.level * 10}%`,
                      backgroundColor: getColor(tool.level),
                      height: "100%",
                      transition: "width 0.3s ease"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HardSkills;
