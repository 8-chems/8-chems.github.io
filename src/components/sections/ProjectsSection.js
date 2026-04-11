=import React, { useState, useEffect } from "react";

// Markdown Renderer
const MarkdownRenderer = ({ content }) => {
  const renderMarkdown = (text) => {
    return text.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return <h1 key={index} className="h2 mb-3">{line.slice(2)}</h1>;
      } else if (line.startsWith("## ")) {
        return <h2 key={index} className="h3 mb-2">{line.slice(3)}</h2>;
      } else if (line.startsWith("- **") && line.includes("**:")) {
        const parts = line.slice(2).split("**:");
        return (
          <li key={index} className="ms-4">
            <strong>{parts[0]}</strong>:{parts[1]}
          </li>
        );
      } else if (line.startsWith("- ")) {
        return <li key={index} className="ms-4">{line.slice(2)}</li>;
      } else if (line.trim() === "") {
        return <br key={index} />;
      } else {
        return <p key={index} className="mb-2">{line}</p>;
      }
    });
  };

  return <div className="prose max-w-none">{renderMarkdown(content)}</div>;
};

// Project Card Image with Unsplash Fallback
const CardImage = ({ src, alt, tags = [], title = "" }) => {
  const [imgSrc, setImgSrc] = useState(src || null);
  const [loading, setLoading] = useState(!src);

  useEffect(() => {
    if (!src) {
      // Build a relevant query from title + first 2 tags
      const query = encodeURIComponent(
        [title, ...tags.slice(0, 2)].filter(Boolean).join(" ")
      );
      // Unsplash Source API — no API key needed
      const unsplashUrl = `https://source.unsplash.com/featured/800x400?${query}`;
      setImgSrc(unsplashUrl);
      setLoading(false);
    }
  }, [src, tags, title]);

  const handleError = () => {
    // If Unsplash fails, fall back to a generic tech image
    setImgSrc(`https://source.unsplash.com/featured/800x400?technology,project`);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "160px",
        overflow: "hidden",
        borderBottom: "1px solid #e5e7eb",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {loading ? (
        <span style={{ fontSize: "12px", color: "#9ca3af" }}>Loading image...</span>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
    </div>
  );
};

// Main Component
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load project data:", err));
  }, []);

  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filterCategory === "All" || project.category === filterCategory;
    const matchesType = filterType === "All" || project.type === filterType;
    const matchesStatus = filterStatus === "All" || project.status === filterStatus;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing": return "bg-primary";
      case "Offered": return "bg-success";
      case "Done": return "bg-warning";
      case "Completed": return "bg-info";
      default: return "bg-secondary";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Development": return "bg-purple";
      case "Research Collaboration": return "bg-success";
      case "Data Science": return "bg-primary";
      default: return "bg-warning";
    }
  };

  return (
    <div className="bg-light py-4 min-vh-100">
      <div className="container">
        <h2 className="display-5 fw-bold mb-4 text-center text-primary">
          Projects Portfolio
        </h2>

        {/* Filters */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label htmlFor="projectCategory" className="form-label fw-medium">Filter by Category:</label>
            <select id="projectCategory" className="form-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="All">All</option>
              <option value="Supervision">Supervision</option>
              <option value="Kaggle">Kaggle</option>
              <option value="GitHub">GitHub</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="projectType" className="form-label fw-medium">Filter by Project Type:</label>
            <select id="projectType" className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All</option>
              <option value="Development">Development</option>
              <option value="Research Collaboration">Research Collaboration</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="projectStatus" className="form-label fw-medium">Filter by Project Status:</label>
            <select id="projectStatus" className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Offered">Offered</option>
              <option value="Done">Done</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <label htmlFor="searchQuery" className="form-label fw-medium">Search by Keyword, Year, or Institute:</label>
          <input
            id="searchQuery"
            type="text"
            className="form-control"
            placeholder="Enter keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Project Cards */}
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div key={index} className="col">
                <div
                  className="card h-100"
                  onClick={() => handleShowModal(project)}
                  style={{ cursor: "pointer" }}
                >
                  <CardImage
                    src={project.image}
                    alt={`${project.title} preview`}
                    tags={project.tags}
                    title={project.title}
                  />
                  <div className="card-body">
                    <h3 className="card-title h5 mb-3 fw-bold">{project.title}</h3>
                    <p className="text-muted mb-1"><strong>Institute:</strong> {project.institute}</p>
                    <p className="text-muted mb-1"><strong>Year:</strong> {project.year}</p>
                    <p className="text-muted mb-1"><strong>Category:</strong> {project.category}</p>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <span className={`badge ${getTypeColor(project.type)}`}>{project.type}</span>
                      <span className={`badge ${getStatusColor(project.status)}`}>{project.status}</span>
                    </div>
                    <p><strong>Description:</strong> {project.description}</p>
                    {project.link && (
                      <p>
                        <strong>Link:</strong>{" "}
                        <a href={project.link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer">
                          {project.link}
                        </a>
                      </p>
                    )}
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="badge bg-secondary">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">No projects found matching the criteria.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        <div
          className={`modal fade ${showModal ? "show d-block" : ""}`}
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProject?.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                {selectedProject && <MarkdownRenderer content={selectedProject.detailedDescription} />}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;