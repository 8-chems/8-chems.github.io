import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Configuration for Git repository
const GIT_CONFIG = {
  baseUrl: 'https://raw.githubusercontent.com/8-chems/myportfolio-src/main',
};

// Set the worker path
GlobalWorkerOptions.workerSrc = './pdf.worker.min.mjs';

const cv = {
  id: 'cv',
  canvasId: 'pdf-canvas1',
  pdfUrl: `${GIT_CONFIG.baseUrl}/cv/Chemseddine_CV__DS_V2.pdf`,
};

const CVSection = () => {
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Flag to track if the component is still mounted
  const isMounted = useRef(true);

  // Load the PDF document
  useEffect(() => {
    isMounted.current = true;

    const loadPdf = async () => {
      if (!cv.pdfUrl) return;

      setLoading(true);
      setError(null);

      try {
        const loadingTask = pdfjsLib.getDocument(cv.pdfUrl);
        const pdf = await loadingTask.promise;

        if (isMounted.current) {
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
        }
      } catch (err) {
        if (isMounted.current) {
          setError('Failed to load CV PDF from repository. Please check the file path or try again later.');
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Render the current page
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const container = containerRef.current;

        // Calculate the scale to fit the container width
        const containerWidth = container.offsetWidth;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        // Set canvas dimensions
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        // Render the page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        if (isMounted.current) {
          console.error('Error rendering page:', err);
          setError('Failed to render the CV PDF page. Please try again.');
        }
      }
    };

    renderPage();
  }, [pdfDoc, pageNum]);

  // Handle window resize to re-render the page
  useEffect(() => {
    const handleResize = () => {
      if (pdfDoc && canvasRef.current && containerRef.current) {
        renderPage();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pdfDoc, pageNum]);

  // Go to the next page
  const goToNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum((prev) => prev + 1);
    }
  };

  // Go to the previous page
  const goToPreviousPage = () => {
    if (pageNum > 1) {
      setPageNum((prev) => prev - 1);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (cv.pdfUrl) {
      window.open(cv.pdfUrl, '_blank');
    }
  };

  return (
    <div className="pdf-viewer">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading CV PDF...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="pdf-container" ref={containerRef}>
          {/* Top Navigation */}
          <div className="navigation">
            <button
              onClick={goToPreviousPage}
              className={`pagination-button left ${pageNum === 1 ? 'disabled' : ''}`}
              disabled={pageNum === 1}
              aria-label="Previous Page"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="page-indicator">
              Page {pageNum} of {totalPages}
            </div>

            <button
              onClick={goToNextPage}
              className={`pagination-button right ${pageNum === totalPages ? 'disabled' : ''}`}
              disabled={pageNum === totalPages}
              aria-label="Next Page"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* PDF Canvas */}
          <canvas ref={canvasRef} className="pdf-canvas"></canvas>

          {/* Bottom Download Button */}
          <div className="download-button">
            <button
              onClick={handleDownload}
              className="download-btn"
              aria-label="Download CV PDF"
            >
              Download CV PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVSection;