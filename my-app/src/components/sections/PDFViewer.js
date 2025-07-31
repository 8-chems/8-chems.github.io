import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, FileText, Clock, User, Tag } from 'lucide-react';
import PDFContent from './PDFContent';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';


const GIT_CONFIG = {
  baseUrl: 'https://raw.githubusercontent.com/8-chems/myportfolio-src/main/courses',
  structureUrl: 'https://raw.githubusercontent.com/8-chems/myportfolio-src/main/courses/structure.json'
};

const iconMap = {
  Layers: Layers,
  BookOpen: BookOpen,
  FileText: FileText
};

const TreeView = ({ modules, onContentChange, loading }) => {
  const [expandedItems, setExpandedItems] = useState(new Set(['fds']));
  const [hoveredModule, setHoveredModule] = useState(null);
  const [hoveredChapter, setHoveredChapter] = useState(null);
  const [hoveredExercise, setHoveredExercise] = useState(null);

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
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
              {module.icon && iconMap[module.icon]
                ? React.createElement(iconMap[module.icon], { size: 20, className: 'moduleIcon' })
                : <Layers size={20} className="moduleIcon" />}
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
                    {chapter.icon && iconMap[chapter.icon]
                      ? React.createElement(iconMap[chapter.icon], { size: 16, className: 'chapterIcon' })
                      : <BookOpen size={16} className="chapterIcon" />}
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

const MetadataPanel = ({ metadata, isVisible, onToggle, zoomLevel, setZoomLevel }) => {
  const [hoveredHeader, setHoveredHeader] = useState(false);
  if (!metadata) return null;

  const iconButtons = [
    {
      Icon: ZoomIn,
      action: () => setZoomLevel(z => Math.min(z + 0.1, 2)),
      title: 'Zoom In',
    },
    {
      Icon: ZoomOut,
      action: () => setZoomLevel(z => Math.max(z - 0.1, 0.5)),
      title: 'Zoom Out',
    },
    {
      Icon: RefreshCw,
      action: () => setZoomLevel(1),
      title: 'Reset Zoom',
    },
  ];

  return (
    <div
      className="metadataPanel"
      style={{
        maxHeight: isVisible ? 'none' : '48px',
        height: isVisible ? 'auto' : '48px',
        overflow: isVisible ? 'visible' : 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      <button
        onClick={onToggle}
        onMouseEnter={() => setHoveredHeader(true)}
        onMouseLeave={() => setHoveredHeader(false)}
        className={`metadataHeader ${hoveredHeader ? 'metadataHeaderHover' : ''}`}
      >
        <div className="moduleHeaderContent" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag size={16} className="metadataIcon" />
            <span>Document Information</span>
          </div>
          <div style={{ display: 'flex', padding: '2px', gap: '8px' }}>
      {iconButtons.map(({ Icon, action, title }, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            action();
          }}
          title={title}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: 'black',
            width: '100px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
          }}
        >
          
          <Icon size={28} strokeWidth={2.} />
        </button>
      ))}
    </div>
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
        <div className="metadataContent" style={{ padding: '16px', display: 'block' }}>
          {metadata.title && (
            <div style={{ marginBottom: '16px' }}>
              <h4 className="metadataTitle">Title</h4>
              <p className="metadataText">{metadata.title}</p>
            </div>
          )}
          <div className="metadataGrid">
            {metadata.author && (
              <div><User size={14} /> <span><strong>Author:</strong> {metadata.author}</span></div>
            )}
            {metadata.updated && (
              <div><Clock size={14} /> <span><strong>Updated:</strong> {new Date(metadata.updated).toLocaleDateString()}</span></div>
            )}
            {metadata.version && (
              <div><Tag size={14} /> <span><strong>Version:</strong> {metadata.version}</span></div>
            )}
            {metadata.uploadDate && (
              <div><Clock size={14} /> <span><strong>Uploaded:</strong> {new Date(metadata.uploadDate).toLocaleDateString()}</span></div>
            )}
          </div>
          {metadata.description && (
            <div>
              <h4 className="metadataTitle">Description</h4>
              <p>{metadata.description}</p>
            </div>
          )}
          {metadata.tags && metadata.tags.length > 0 && (
            <div>
              <h4 className="metadataTitle">Tags</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {metadata.tags.map((tag, idx) => (
                  <span key={idx} className="tagBadge">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PDFViewer = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [metadataVisible, setMetadataVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const getNumberFromFileName = (fileName) => {
    const match = fileName.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const generateTitle = (fileName) => {
    const name = fileName.replace(/\.[^/.]+$/, '');
    return name.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const fetchMetadata = async (content) => {
    try {
      const response = await fetch(content.metadataUrl);
      const data = await response.json();
      setMetadata({
        title: data.title || content.title,
        author: data.author || 'Chemseddine',
        updated: data.updated || new Date().toISOString(),
        description: data.description || '',
        tags: data.tags || [],
        version: data.version || '1.0',
        uploadDate: data.uploadDate || data.updated || new Date().toISOString()
      });
    } catch {
      setMetadata({
        title: content.title,
        author: 'Chemseddine',
        updated: new Date().toISOString(),
        description: `Document about ${content.title}`,
        tags: [],
        version: '1.0',
        uploadDate: new Date().toISOString()
      });
    }
  };

  const fetchModulesData = async () => {
    try {
      const res = await fetch(GIT_CONFIG.structureUrl);
      const data = await res.json();

      const modules = data.map(course => {
        const lectures = [];
        const exercises = [];

        course.files.forEach(file => {
          const item = {
            id: `${course.id}_${file.name}`,
            title: generateTitle(file.name),
            pdfUrl: file.url,
            metadataUrl: file.metadata,
            type: file.type,
            moduleId: course.id,
            fileName: file.name
          };
          file.type === 'lecture' ? lectures.push(item) : exercises.push(item);
        });

        const chapters = lectures.map((lecture, i) => {
          const related = exercises.filter(ex => getNumberFromFileName(ex.fileName) === getNumberFromFileName(lecture.fileName));
          return { ...lecture, id: `${course.id}_chapter${i + 1}`, exercises: related };
        });

        return { id: course.id, title: course.title, icon: 'Layers', chapters };
      });

      setModules(modules);
      if (modules.length) {
        const first = modules[0].chapters[0];
        setActiveContent(first);
        fetchMetadata(first);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = async (content) => {
    setActiveContent(content);
    await fetchMetadata(content);
  };

  useEffect(() => {
    fetchModulesData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pdfviewercontainer">
      <div className="treeContainer">
        <TreeView modules={modules} onContentChange={handleContentChange} loading={loading} />
      </div>

      <div className="viewerContainer">
        <MetadataPanel
          metadata={metadata}
          isVisible={metadataVisible}
          onToggle={() => setMetadataVisible(!metadataVisible)}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
        />
        <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left', transition: 'transform 0.2s ease' }}>
          <PDFContent activeContent={activeContent} />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
