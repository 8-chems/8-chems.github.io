import React, { useEffect, useState } from "react";

// Markdown Renderer (same as in Projects)
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

// News Card Image with Placeholder
const CardImage = ({ src, alt }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const showPlaceholder = !src || imgFailed;

  return (
    <div
      style={{
        width: "100%",
        height: "160px",
        overflow: "hidden",
        borderBottom: "1px solid #e5e7eb",
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        flexShrink: 0,
      }}
    >
      {!showPlaceholder && (
        <img
          src={src}
          alt={alt}
          onError={() => setImgFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      {showPlaceholder && (
        <>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.25 }}
          >
            <rect x="2" y="6" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
            <path
              d="M2 26l8-6 6 5 5-4 13 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>No image yet</span>
        </>
      )}
    </div>
  );
};

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [activeNews, setActiveNews] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/news.json")
      .then((res) => res.json())
      .then((data) => setNewsItems(data))
      .catch((err) => console.error("Error loading news.json", err));
  }, []);

  const handleClick = (news) => {
    setActiveNews(news);
    setShowModal(true);
  };

  const handleClose = () => {
    setActiveNews(null);
    setShowModal(false);
  };

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredNews = [...newsItems]
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const aVal = a[sortField].toLowerCase();
      const bVal = b[sortField].toLowerCase();
      return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

  return (
    <div className="page active" id="page-8">
      <div className="container py-4">
        <h2 className="display-6 fw-bold text-center mb-4 text-primary">
          Professional News & Updates
        </h2>

        {/* Search and Sort */}
        <div className="d-flex flex-wrap gap-3 justify-content-between mb-4">
          <input
            type="text"
            className="form-control w-100 w-md-50"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="btn-group">
            <button
              className={`btn btn-outline-primary ${sortField === "date" ? "active" : ""}`}
              onClick={() => toggleSort("date")}
            >
              Sort by Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-outline-primary ${sortField === "title" ? "active" : ""}`}
              onClick={() => toggleSort("title")}
            >
              Sort by Title {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          </div>
        </div>

        {/* News Grid */}
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <div key={index} className="col">
                <div
                  className="card h-100 shadow-sm"
                  onClick={() => handleClick(news)}
                  style={{ cursor: "pointer" }}
                >
                  <CardImage src={news.image} alt={`${news.title} preview`} />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{news.title}</h5>
                    <p className="text-muted mb-1">
                      <strong>Date:</strong> {news.date} | <strong>Category:</strong> {news.category}
                    </p>
                    <p className="mb-2">{news.description}</p>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {news.tags?.map((tag, i) => (
                        <span key={i} className="badge bg-secondary">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">No news found.</p>
            </div>
          )}
        </div>

        {/* Modal Panel (same style as Projects) */}
        <div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{activeNews?.title}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                {activeNews && <MarkdownRenderer content={activeNews.markdown} />}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsSection;