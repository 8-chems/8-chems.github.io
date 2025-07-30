import React from "react";

const EducationSection = () => {
  return (
    <div className="page active" id="page-2" style={{ color: "#343a40" }}>
      <div className="container">
        <h2 className="fw-bold text-center mb-4" id="education_section" style={{ color: "#007bff" }}>
          Education
        </h2>

        {/* PhD Section */}
        <div className="mb-5">
          <h4 className="mb-3">
            <span className="bg-light rounded-pill px-3 py-2 d-inline-block" style={{ fontSize: "1.2rem" }}>
              <i className="fa fa-graduation-cap text-primary"></i> PhD in Computer Science, 2021
            </span>
          </h4>
          <p className="mb-2">
            <i className="fa fa-university text-secondary me-2"></i>
            <a
              href="https://www.univ-annaba.dz"
             
              className="text-decoration-none text-primary"
            >
              Badji Mokhtar University, Annaba, Algeria
            </a>
          </p>
          <p>
            During my doctoral research, I focused on improving recommendation quality in e-commerce applications. 
            I proposed a multi-objective genetic-based clustering algorithm to balance diversity, novelty, and relevance 
            of recommendations—often conflicting quality metrics. This approach utilized optimization and data reduction 
            techniques to group users into diverse clusters, achieving comparative results to similar methodologies. 
          </p>
          <p>
            For a detailed presentation, visit 
            <a
              href="https://www.slideshare.net/chemeseddineberbegue/study-of-relevancy-diversity-and-novelty-in-recommender-systems"
            
              className="text-decoration-none text-primary"
            >
              <b> Slideshare</b>
            </a>, or contact me to request a copy of my thesis.
          </p>
        </div>

        {/* MSc Section */}
        <div>
          <h4 className="mb-3">
            <span className="bg-light rounded-pill px-3 py-2 d-inline-block" style={{ fontSize: "1.2rem" }}>
              <i className="fa fa-graduation-cap text-primary"></i> MSc in Science and Technologies of Information and Communication, 2015
            </span>
          </h4>
          <p className="mb-2">
            <i className="fa fa-university text-secondary me-2"></i>
            <a
              href="https://www.univ-annaba.dz"
             
              className="text-decoration-none text-primary"
            >
              Badji Mokhtar University, Annaba, Algeria
            </a>
          </p>
          <p>
            In my Master's project, I developed a Java application to explore, query, and filter semantic knowledge 
            from OWL/RDFS ontologies using SPARQL and association rule techniques. The validated results enriched the 
            information system by reintegration. 
          </p>
          <p>
            For more details, visit 
            <a
              href="https://www.slideshare.net/chemeseddineberbegue/ontologies-mining-using-association-rules"
             
              className="text-decoration-none text-primary"
            >
              <b> Slideshare</b>
            </a>. The code is available on 
            <a
              href="https://github.com/8-chems/OntologyMiner"
              
              className="text-decoration-none text-primary"
            >
              <b> GitHub</b>
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
