import React, { useEffect, useState } from "react";

const ResearchWorkSection = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/research.json")
      .then((res) => res.json())
      .then((data) => setPublications(data))
      .catch((err) => console.error("Error loading research.json:", err));
  }, []);

  const selectedPub = publications.find((pub) => pub.isSelected);
  const otherPubs = publications.filter((pub) => !pub.isSelected);

  return (
    <div className="page active" id="page-5">
      <h2 className="fw-bold mb-4 text-center text-primary">Research Work</h2>

      {/* Selected Publication */}
      {selectedPub && (
        <div className="card mb-4">
          <h5 className="card-header">Selected Publication</h5>
          <div className="card-body">
            <h3 className="card-title">
              <a
                href={selectedPub.links[1]?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedPub.title}
              </a>
            </h3>
            <blockquote className="blockquote">
              <p>{selectedPub.authors}</p>
              <div className="blockquote-footer">
                {selectedPub.journal}, {selectedPub.year}
              </div>
            </blockquote>
            <div>
              {selectedPub.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark me-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Publications */}
      <div className="card">
        <h5 className="card-header">Other Publications</h5>
        <div className="card-body">
          <ul className="list-group">
            {otherPubs.map((pub, index) => (
              <li key={index} className="list-group-item">
                <h5 className="mb-2">{pub.title}</h5>
                <p className="mb-1">
                  <strong>Authors:</strong> {pub.authors}
                </p>
                <p className="mb-1">
                  <strong>Journal:</strong> {pub.journal}
                </p>
                <p className="mb-1">
                  <strong>Year:</strong> {pub.year}
                </p>
                <div className="mt-2">
                  {pub.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-dark me-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResearchWorkSection;
