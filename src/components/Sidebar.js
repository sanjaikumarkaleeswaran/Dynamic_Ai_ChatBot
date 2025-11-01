import React, { useState } from 'react';
import { formatTimestamp, exportAsText, exportAsJSON, exportAsMarkdown, downloadFile } from '../utils/formatters';
import './Sidebar.css';

function Sidebar({ conversations, currentId, onSelect, onNew, onDelete, onClearAll, isOpen, onClose }) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format) => {
    const current = conversations.find(c => c.id === currentId);
    if (!current) return;

    const timestamp = new Date().toISOString().split('T')[0];
    let content, filename;

    switch (format) {
      case 'txt':
        content = exportAsText(current.messages);
        filename = `chat-${timestamp}.txt`;
        break;
      case 'json':
        content = exportAsJSON(current.messages);
        filename = `chat-${timestamp}.json`;
        break;
      case 'md':
        content = exportAsMarkdown(current.messages);
        filename = `chat-${timestamp}.md`;
        break;
      default:
        return;
    }

    downloadFile(content, filename);
    setShowExportMenu(false);
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Chat History</h2>
          <button className="close-button" onClick={onClose} aria-label="Close sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <button className="new-chat-button" onClick={onNew}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New Chat
        </button>

        <div className="conversations-list">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`conversation-item ${conv.id === currentId ? 'active' : ''}`}
              onClick={() => {
                onSelect(conv.id);
                onClose();
              }}
            >
              <div className="conversation-info">
                <div className="conversation-title">{conv.title}</div>
                <div className="conversation-time">
                  {formatTimestamp(new Date(conv.updatedAt))}
                </div>
              </div>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conv.id);
                }}
                aria-label="Delete conversation"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="export-menu">
            <button
              className="export-button"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export Chat
            </button>

            {showExportMenu && (
              <div className="export-dropdown">
                <button onClick={() => handleExport('txt')}>Text (.txt)</button>
                <button onClick={() => handleExport('json')}>JSON (.json)</button>
                <button onClick={() => handleExport('md')}>Markdown (.md)</button>
              </div>
            )}
          </div>

          <button className="clear-button" onClick={onClearAll}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Clear All
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;