import React, { useEffect, useState } from "react";

const BiographySection = () => {
  const [bioHtml, setBioHtml] = useState("");

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/biography.json')
      .then((res) => res.json())
      .then((data) => {
        setBioHtml(data.bioHtml);
      })
      .catch((err) => console.error("Failed to load biography:", err));
  }, []);

  return (
    <div className="page active" id="page-1" style={{ color: "#343a40" }}>
      <h1
        className="fw-bold text-center mb-4"
        id="biography_section"
        style={{ color: "#007bff" }}
      >
        Biography
      </h1>

      <div className="content">
        {bioHtml && (
          <div
            className="bio-text"
            dangerouslySetInnerHTML={{ __html: bioHtml }}
          />
        )}

        {/* Video Section */}
        <div className="video-container text-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/watch?v=oPVte6aMprI"
            title="Biography Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BiographySection;
