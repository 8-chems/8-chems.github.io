import React from 'react';
import PDFViewer from './PDFViewer';

const DocumentViewer = () => {
  return (
    <div className="document-viewer-container">
      {/* Clean display card linking to lectures */}
      <div
        className="lectures-link-card"
        style={{
          padding: '1rem 1.5rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          backgroundColor: '#f0f4f8',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      >
        <a
          href="https://8-chems.github.io/lectures"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#1a73e8',
            fontWeight: '600',
            fontSize: '1.1rem',
          }}
        >
          📚 View Lectures
        </a>
      </div>

      <main className="document-viewer-content">
        <PDFViewer />
      </main>
    </div>
  );
};

export default DocumentViewer;
