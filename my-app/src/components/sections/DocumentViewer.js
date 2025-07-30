import React from 'react';
import PDFViewer from './PDFViewer';

const DocumentViewer = () => {
  return (
    <div className="document-viewer-container">
      <main className="document-viewer-content">
        <PDFViewer />
      </main>
    </div>
  );
};

export default DocumentViewer;