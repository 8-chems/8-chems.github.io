import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, FileText, Clock, User, Tag } from 'lucide-react';
import PDFContent from './PDFContent';

// Configuration for Git repository
const GIT_CONFIG = {
  baseUrl: 'https://raw.githubusercontent.com/8-chems/myportfolio-src/main/courses',
  apiBaseUrl: 'https://api.github.com/repos/8-chems/myportfolio-src/contents/courses'
};

// Map icon names to lucide-react components
const iconMap = {
  Layers: Layers,
  BookOpen: BookOpen,
  FileText: FileText
};

// TreeView Component
const TreeView = ({ modules, onContentChange, loading }) => {
  const [expandedItems, setExpandedItems] = useState(new Set(['fds']));
  const [hoveredModule, setHoveredModule] = useState(null);
  const [hoveredChapter, setHoveredChapter] = useState(null);
  const [hoveredExercise, setHoveredExercise] = useState(null);

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
        <p>Loading modules...</p>
      </div>
    );
  }

  return (
    <div>
      {modules.map((module) => (
        <div key={module.id} className="moduleContainer">
          <button
            onClick={() => toggleExpanded(module.id)}
            onMouseEnter={() => setHoveredModule(module.id)}
            onMouseLeave={() => setHoveredModule(null)}
            className={`moduleHeader ${hoveredModule === module.id ? 'moduleHeaderHover' : ''}`}
          >
            <div className="moduleHeaderContent">
              {module.icon && iconMap[module.icon] ? (
                React.createElement(iconMap[module.icon], { size: 20, className: 'moduleIcon' })
              ) : (
                <Layers size={20} className="moduleIcon" />
              )}
              <span>{module.title}</span>
            </div>
            <span
              style={{
                transition: 'transform 0.2s',
                transform: expandedItems.has(module.id) ? 'rotate(90deg)' : 'rotate(0deg)'
              }}
            >
              ▶
            </span>
          </button>
          
          {expandedItems.has(module.id) && (
            <div className="chapterContainer">
              {module.chapters?.map((chapter) => (
                <div key={chapter.id}>
                  <button
                    onClick={() => onContentChange({ ...chapter, moduleId: module.id })}
                    onMouseEnter={() => setHoveredChapter(chapter.id)}
                    onMouseLeave={() => setHoveredChapter(null)}
                    className={`chapterButton ${hoveredChapter === chapter.id ? 'chapterButtonHover' : ''}`}
                  >
                    {chapter.icon && iconMap[chapter.icon] ? (
                      React.createElement(iconMap[chapter.icon], { size: 16, className: 'chapterIcon' })
                    ) : (
                      <BookOpen size={16} className="chapterIcon" />
                    )}
                    <span>{chapter.title}</span>
                  </button>
                  
                  {chapter.exercises?.length > 0 && (
                    <div>
                      {chapter.exercises.map((exercise) => (
                        <button
                          key={exercise.id}
                          onClick={() => onContentChange({ ...exercise, moduleId: module.id, chapterId: chapter.id })}
                          onMouseEnter={() => setHoveredExercise(exercise.id)}
                          onMouseLeave={() => setHoveredExercise(null)}
                          className={`exerciseButton ${hoveredExercise === exercise.id ? 'exerciseButtonHover' : ''}`}
                        >
                          <FileText size={14} className="exerciseIcon" />
                          <span>{exercise.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Metadata Display Component
const MetadataPanel = ({ metadata, isVisible, onToggle }) => {
  const [hoveredHeader, setHoveredHeader] = useState(false);
  
  if (!metadata) return null;

  return (
    <div className="metadataPanel" style={{ maxHeight: isVisible ? '400px' : '48px' }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHoveredHeader(true)}
        onMouseLeave={() => setHoveredHeader(false)}
        className={`metadataHeader ${hoveredHeader ? 'metadataHeaderHover' : ''}`}
      >
        <div className="moduleHeaderContent">
          <Tag size={16} className="metadataIcon" />
          <span>Document Information</span>
        </div>
        <span
          style={{
            transition: 'transform 0.2s',
            transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          ▼
        </span>
      </button>
      
      {isVisible && (
        <div className="metadataContent">
          <div className="metadataGrid">
            {metadata.title && (
              <div>
                <h4 className="metadataTitle">Title</h4>
                <p className="metadataText">{metadata.title}</p>
              </div>
            )}
            
            {metadata.author && (
              <div className="metadataItem">
                <User size={14} />
                <div>
                  <span className="metadataLabel">Author: </span>
                  <span className="metadataText">{metadata.author}</span>
                </div>
              </div>
            )}
            
            {metadata.lastUpdated && (
              <div className="metadataItem">
                <Clock size={14} />
                <div>
                  <span className="metadataLabel">Updated: </span>
                  <span className="metadataText">
                    {new Date(metadata.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
            
            {metadata.version && (
              <div>
                <span className="metadataLabel">Version: </span>
                <span className="metadataText">{metadata.version}</span>
              </div>
            )}
          </div>
          
          {metadata.description && (
            <div className="metadataDescriptionContainer">
              <h4 className="metadataTitle">Description</h4>
              <p className="metadataDescription">{metadata.description}</p>
            </div>
          )}
          
          {metadata.tags && metadata.tags.length > 0 && (
            <div>
              <h4 className="metadataTitle">Tags</h4>
              <div className="tagContainer">
                {metadata.tags.map((tag, index) => (
                  <span key={index} className="pdfviewertag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Enhanced PDF Viewer Component
const PDFViewer = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [metadataVisible, setMetadataVisible] = useState(false);

  // Utility to generate human-readable title from file name
  const generateTitle = (fileName, type, chapterNumber, exerciseIndex) => {
    // For exercises, format as "Series X.Y" where X is chapter number, Y is exercise index
    if (type === 'exercise' && chapterNumber && exerciseIndex !== undefined) {
      return `Series ${chapterNumber}.${exerciseIndex + 1}`;
    }
    
    // For chapters and modules
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    if (nameWithoutExt.toLowerCase().startsWith('series')) {
      return `Series ${nameWithoutExt.match(/\d+/)?.[0] || nameWithoutExt}`;
    }
    return nameWithoutExt
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  // Utility to extract numeric identifier from file name
  const getNumberFromFileName = (fileName) => {
    const match = fileName.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  // Fetch modules data from Git repository
  const fetchModulesData = async () => {
    try {
      setLoading(true);

      // Fetch list of course folders
      const coursesResponse = await fetch(GIT_CONFIG.apiBaseUrl);
      if (!coursesResponse.ok) {
        throw new Error(`Failed to fetch courses: ${coursesResponse.status}`);
      }
      const courses = await coursesResponse.json();

      const modulesData = await Promise.all(
        courses
          .filter(item => item.type === 'dir')
          .map(async (course) => {
            const courseId = course.name;

            // Fetch lectures
            const lecturesResponse = await fetch(`${GIT_CONFIG.apiBaseUrl}/${courseId}/lectures`);
            const lectures = lecturesResponse.ok
              ? (await lecturesResponse.json()).filter(item => item.name.endsWith('.pdf'))
              : [];

            // Fetch exercises
            const exercisesResponse = await fetch(`${GIT_CONFIG.apiBaseUrl}/${courseId}/exercises`);
            const exercises = exercisesResponse.ok
              ? (await exercisesResponse.json()).filter(item => item.name.endsWith('.pdf'))
              : [];

            // Create chapters from lectures
            const chapters = lectures.map((lecture, index) => {
              const chapterId = `${courseId}_chapter${index + 1}`;
              const chapterTitle = generateTitle(lecture.name, 'chapter');
              const lectureNumber = getNumberFromFileName(lecture.name);
              const chapterNumber = index + 1; // Chapter number (1-based)

              // Match exercises by numeric identifier (e.g., Series_1.pdf to chapter_1.pdf)
              let relatedExercises = exercises
                .filter(ex => {
                  const exNumber = getNumberFromFileName(ex.name);
                  return exNumber && lectureNumber && exNumber === lectureNumber;
                })
                .map((ex, exIndex) => ({
                  id: `${chapterId}_ex${exIndex + 1}`,
                  type: 'exercise',
                  title: generateTitle(ex.name, 'exercise', chapterNumber, exIndex),
                  pdfUrl: `/exercises/${ex.name}`,
                  icon: 'FileText'
                }));

              // Fallback: Assign exercises in order if no numeric match
              if (relatedExercises.length === 0 && exercises.length > index) {
                relatedExercises = [{
                  id: `${chapterId}_ex${index + 1}`,
                  type: 'exercise',
                  title: generateTitle(exercises[index].name, 'exercise', chapterNumber, 0),
                  pdfUrl: `/exercises/${exercises[index].name}`,
                  icon: 'FileText'
                }];
              }

              return {
                id: chapterId,
                type: 'chapter',
                title: chapterTitle,
                pdfUrl: `/lectures/${lecture.name}`,
                icon: 'BookOpen',
                exercises: relatedExercises
              };
            });

            return {
              id: courseId,
              title: generateTitle(courseId, 'module'),
              icon: 'Layers',
              chapters: chapters.filter(ch => ch.exercises.length > 0 || ch.pdfUrl)
            };
          })
      );

      const filteredModules = modulesData.filter(module => module.chapters.length > 0);
      setModules(filteredModules);

      // Set initial content
      if (filteredModules.length > 0 && filteredModules[0].chapters?.length > 0) {
        const firstChapter = filteredModules[0].chapters[0];
        setActiveContent(firstChapter);
        await fetchMetadata(firstChapter);
      } else {
        setError('No chapters or exercises found in the repository');
      }

    } catch (err) {
      setError(`Failed to load modules data: ${err.message}`);
      console.error('Error fetching modules:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch metadata for a specific content item
  const fetchMetadata = async (content) => {
    if (!content || !content.id || !content.moduleId) {
      setMetadata({ title: content?.title || 'Untitled' });
      return;
    }
    
    try {
      const metadataFileName = `${content.id}.md`;
      const metadataUrl = `${GIT_CONFIG.baseUrl}/${content.moduleId}/metadata/${metadataFileName}`;
      
      const response = await fetch(metadataUrl);
      if (response.ok) {
        const markdownContent = await response.text();
        const mockMetadata = {
          title: content.title,
          author: content.moduleId === 'fds' ? 'Dr. Data Science' : 'Dr. Machine Learning',
          lastUpdated: new Date().toISOString(),
          version: '1.0',
          description: `This document covers ${content.title.toLowerCase()} with comprehensive examples and exercises.`,
          tags: content.type === 'chapter' ? ['lecture', 'theory', 'fundamentals'] : ['exercise', 'practice', 'homework'],
          difficulty: content.type === 'chapter' ? 'Intermediate' : 'Beginner',
          estimatedTime: content.type === 'chapter' ? '45 minutes' : '30 minutes'
        };
        setMetadata(mockMetadata);
      } else {
        setMetadata({ title: content.title });
      }
      
    } catch (err) {
      console.error('Error fetching metadata:', err);
      setMetadata({ title: content.title });
    }
  };

  // Handle content change
  const handleContentChange = async (content) => {
    setActiveContent({
      ...content,
      pdfUrl: content.pdfUrl.startsWith('http')
        ? content.pdfUrl
        : `${GIT_CONFIG.baseUrl}/${content.moduleId}${content.pdfUrl}`
    });
    await fetchMetadata(content);
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchModulesData();
  }, []);

  if (error) {
    return (
      <div className="errorContainer">
        <div className="errorContent">
          <div className="errorIcon">⚠️</div>
          <p className="errorText">{error}</p>
          <button 
            onClick={fetchModulesData}
            className="retryButton"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pdfviewercontainer">
      <div className="treeContainer">
        <TreeView
          modules={modules}
          onContentChange={handleContentChange}
          loading={loading}
        />
      </div>
      <div className="viewerContainer">
        <MetadataPanel 
          metadata={metadata} 
          isVisible={metadataVisible}
          onToggle={() => setMetadataVisible(!metadataVisible)}
        />
        <PDFContent activeContent={activeContent} />
      </div>
    </div>
  );
};

export default PDFViewer;