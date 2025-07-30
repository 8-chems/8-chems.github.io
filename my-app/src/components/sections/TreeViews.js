import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  ChevronRight, 
  ChevronDown,
  FileText 
} from 'lucide-react';

const TreeView = ({ onContentChange, modules }) => {
  const [openModules, setOpenModules] = useState([]);
  const [openChapters, setOpenChapters] = useState([]);

  const toggleModule = (moduleId) => {
    setOpenModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleChapter = (chapterId) => {
    setOpenChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleChapterSelect = (chapter) => {
    onContentChange(chapter);
  };

  const handleExerciseClick = (exercise, e) => {
    e.stopPropagation(); // Prevent chapter toggle
    if (exercise.pdfUrl) {
      onContentChange(exercise);
      console.info(exercise.type);
    }
  };

  return (
    <div className="tree-container">
      <div className="tree-header">
        <BookOpen className="tree-header-icon" />
        <h2 className="tree-header-title">Course Modules</h2>
      </div>
      
      {modules.map((module) => {
        const ModuleIcon = module.icon;
        const isOpen = openModules.includes(module.id);
        
        return (
          <div key={module.id} className="tree-module">
            <div 
              className={`tree-module-header ${isOpen ? 'open' : ''}`}
              onClick={() => toggleModule(module.id)}
            >
              <div className="tree-module-title-group">
                <ModuleIcon className={`tree-module-icon ${isOpen ? 'active' : ''}`} />
                <span className="tree-module-title">{module.title}</span>
              </div>
              
              <div className="tree-module-chevron">
                {isOpen 
                  ? <ChevronDown className="tree-chevron-icon" />
                  : <ChevronRight className="tree-chevron-icon" />
                }
              </div>
            </div>
            
            {isOpen && (
              <div className="tree-chapter-list">
                {module.chapters.map((chapter) => {
                  const ChapterIcon = chapter.icon;
                  const isChapterOpen = openChapters.includes(chapter.id);
                  
                  return (
                    <div key={chapter.id}>
                      <div 
                        className="tree-chapter-item"
                        onClick={() => {
                          handleChapterSelect(chapter);
                          toggleChapter(chapter.id);
                        }}
                      >
                        <ChapterIcon className="tree-chapter-icon" />
                        <span className="tree-chapter-title">{chapter.title}</span>
                        {chapter.exercises && chapter.exercises.length > 0 && (
                          <div className="tree-chapter-chevron">
                            {isChapterOpen 
                              ? <ChevronDown className="tree-chevron-icon" />
                              : <ChevronRight className="tree-chevron-icon" />
                            }
                          </div>
                        )}
                      </div>

                      {isChapterOpen && chapter.exercises && (
                        <div className="tree-exercise-list">
                          {chapter.exercises.map((exercise) => (
                            <div 
                              key={exercise.id}
                              className="tree-exercise-item ml-4"
                              onClick={(e) => handleExerciseClick(exercise, e)}
                            >
                              <FileText className="tree-exercise-icon" />
                              <span className="tree-exercise-title">{exercise.title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TreeView;