import React, { useState } from 'react';
import { useChatHistory } from '../context/ChatHistoryContext';
import './HistorySidebar.css';

const HistorySidebar = ({ onSelectConversation, onClose, onNewChat }) => {
const { conversations, deleteConversation, clearAllConversations } = useChatHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Filter conversations by search
  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartEdit = (conv) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const handleSaveEdit = (id) => {
  if (editTitle.trim()) {
    // Direct localStorage update (workaround)
    const savedConvs = JSON.parse(localStorage.getItem('chatbot-conversations') || '[]');
    const updated = savedConvs.map(conv => 
      conv.id === id ? { ...conv, title: editTitle.trim() } : conv
    );
    localStorage.setItem('chatbot-conversations', JSON.stringify(updated));
    
    // Force page reload to show changes
    window.location.reload();
  }
  setEditingId(null);
};


  const getConversationColor = (index) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="modern-sidebar">
      {/* Header */}
      <div className="modern-sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h2>Chat History</h2>
        </div>
        <button className="close-sidebar" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="sidebar-actions">
        <button className="new-chat-action" onClick={onNewChat}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
          Start New Conversation
        </button>
      </div>

      {/* Search */}
      <div className="sidebar-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Conversations */}
      <div className="sidebar-conversations">
        {conversations.length === 0 ? (
          <div className="empty-conversations">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>No conversations yet</h3>
            <p>Start a new chat to begin</p>
          </div>
        ) : (
          <div className="conversation-cards">
            {filteredConversations.map((conv, index) => (
              <div
                key={conv.id}
                className="conversation-card"
                onClick={() => !editingId && onSelectConversation(conv.id)}
              >
                <div
                  className="card-gradient"
                  style={{ background: getConversationColor(index) }}
                ></div>
                
                <div className="card-content">
                  {editingId === conv.id ? (
                    <input
                      type="text"
                      className="edit-title-input"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(conv.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                    />
                  ) : (
                    <h3 className="card-title">{conv.title}</h3>
                  )}
                  
                  <div className="card-meta">
                    <span className="card-date">
                      {new Date(conv.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="card-messages">
                      {conv.messages.length} messages
                    </span>
                  </div>
                </div>

                <div className="card-actions">
                  {editingId === conv.id ? (
                    <>
                      <button
                        className="action-btn save-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit(conv.id);
                        }}
                        title="Save"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                      <button
                        className="action-btn cancel-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(null);
                        }}
                        title="Cancel"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="action-btn edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(conv);
                        }}
                        title="Rename"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        title="Delete"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {conversations.length > 0 && (
        <div className="sidebar-footer">
          {showDeleteConfirm ? (
            <div className="delete-confirm">
              <p>Delete all conversations?</p>
              <div className="confirm-actions">
                <button
                  onClick={() => {
                    clearAllConversations();
                    setShowDeleteConfirm(false);
                  }}
                  className="confirm-yes"
                >
                  Yes, delete all
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="confirm-no"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="clear-all-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Clear All Conversations
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HistorySidebar;
