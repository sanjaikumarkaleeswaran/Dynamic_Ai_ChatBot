// import React, { useState } from 'react';
// import { useChatHistory } from '../context/ChatHistoryContext';

// const HistorySidebar = ({ onSelectConversation, onNewConversation, currentChatId }) => {
//   const { conversations, deleteConversation, clearAllConversations } = useChatHistory();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isOpen, setIsOpen] = useState(true);

//   const filteredConversations = conversations.filter(conv =>
//     conv.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSelectConversation = (conversationId) => {
//     if (onSelectConversation && typeof onSelectConversation === 'function') {
//       onSelectConversation(conversationId);
//     }
//   };

//   const handleNewConversation = () => {
//     if (onNewConversation && typeof onNewConversation === 'function') {
//       onNewConversation();
//     }
//   };

//   const handleClearAll = () => {
//     if (window.confirm('Are you sure you want to delete all conversations?')) {
//       clearAllConversations();
//     }
//   };

//   // Color array for chat items
//   const borderColors = ['#e91e63', '#00bcd4', '#4caf50', '#ff9800', '#9c27b0', '#f44336'];

//   return (
//     <>
//       {/* Main Sidebar Container */}
//       <div style={{
//         width: '280px',
//         height: '100vh',
//         background: '#2b2d42',  // Dark navy
//         borderRight: '1px solid rgba(107, 92, 231, 0.2)',
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'fixed',
//         left: 0,
//         top: 0,
//         zIndex: 100,
//         transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
//         transition: 'transform 0.3s ease',
//         overflowY: 'auto'
//       }}>
        
//         {/* Header */}
//         <div style={{
//           padding: '16px',
//           background: '#1f2937',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             fontSize: '18px',
//             fontWeight: '600',
//             color: 'white'
//           }}>
//             <div style={{
//               width: '36px',
//               height: '36px',
//               padding: '8px',
//               background: 'linear-gradient(135deg, #6b5ce7 0%, #7b6af0 100%)',
//               borderRadius: '10px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//               </svg>
//             </div>
//             <span>Chat History</span>
//           </div>
//           <button
//             onClick={() => setIsOpen(false)}
//             style={{
//               width: '32px',
//               height: '32px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               background: 'transparent',
//               border: '1px solid rgba(255, 255, 255, 0.1)',
//               borderRadius: '6px',
//               color: 'rgba(255, 255, 255, 0.7)',
//               cursor: 'pointer'
//             }}
//           >
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </button>
//         </div>

//         {/* New Conversation Button - Purple Gradient */}
//         <button
//           onClick={handleNewConversation}
//           style={{
//             margin: '16px',
//             padding: '12px 16px',
//             background: 'linear-gradient(135deg, #6b5ce7 0%, #7b6af0 100%)',
//             color: 'white',
//             border: 'none',
//             borderRadius: '10px',
//             fontSize: '14px',
//             fontWeight: '600',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '8px',
//             boxShadow: '0 4px 12px rgba(107, 92, 231, 0.3)',
//             transition: 'transform 0.2s'
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//           onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <line x1="12" y1="5" x2="12" y2="19"></line>
//             <line x1="5" y1="12" x2="19" y2="12"></line>
//           </svg>
//           Start New Conversation
//         </button>

//         {/* Search Bar */}
//         <div style={{
//           padding: '0 16px 16px 16px',
//           borderBottom: '1px solid rgba(107, 92, 231, 0.15)'
//         }}>
//           <input
//             type="text"
//             placeholder="Search conversations..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '10px 12px',
//               background: 'rgba(107, 92, 231, 0.08)',
//               border: '1px solid rgba(107, 92, 231, 0.2)',
//               borderRadius: '8px',
//               color: 'white',
//               fontSize: '14px',
//               outline: 'none'
//             }}
//           />
//         </div>

//         {/* Chat History List */}
//         <div style={{
//           flex: 1,
//           overflowY: 'auto',
//           padding: '12px'
//         }}>
//           {filteredConversations.length === 0 ? (
//             <div style={{
//               padding: '40px 16px',
//               textAlign: 'center',
//               color: 'rgba(255, 255, 255, 0.4)'
//             }}>
//               <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 16px', opacity: 0.3 }}>
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//               </svg>
//               <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px', color: 'rgba(255, 255, 255, 0.7)' }}>
//                 No conversations yet
//               </div>
//               <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>
//                 Start a new chat to begin
//               </div>
//             </div>
//           ) : (
//             filteredConversations.map((conversation, index) => (
//               <div
//                 key={conversation.id}
//                 onClick={() => handleSelectConversation(conversation.id)}
//                 style={{
//                   padding: '16px',
//                   marginBottom: '12px',
//                   borderRadius: '14px',
//                   cursor: 'pointer',
//                   borderLeft: `4px solid ${borderColors[index % borderColors.length]}`,
//                   background: currentChatId === conversation.id 
//                     ? 'rgba(107, 92, 231, 0.2)' 
//                     : 'rgba(255, 255, 255, 0.04)',
//                   minHeight: '70px',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   transition: 'all 0.2s',
//                   boxShadow: currentChatId === conversation.id 
//                     ? '0 2px 8px rgba(107, 92, 231, 0.2)' 
//                     : 'none'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = 'rgba(107, 92, 231, 0.15)';
//                   e.currentTarget.style.transform = 'translateX(2px)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = currentChatId === conversation.id 
//                     ? 'rgba(107, 92, 231, 0.2)' 
//                     : 'rgba(255, 255, 255, 0.04)';
//                   e.currentTarget.style.transform = 'translateX(0)';
//                 }}
//               >
//                 <div style={{
//                   fontSize: '15px',
//                   fontWeight: '600',
//                   color: 'white',
//                   marginBottom: '8px',
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   lineHeight: '1.4'
//                 }}>
//                   {conversation.title}
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   fontSize: '12px',
//                   color: 'rgba(255, 255, 255, 0.5)',
//                   marginTop: '4px'
//                 }}>
//                   <span style={{ fontSize: '11px' }}>
//                     {new Date(conversation.createdAt).toLocaleDateString()}
//                   </span>
//                   <span style={{
//                     fontSize: '11px',
//                     padding: '3px 10px',
//                     background: 'rgba(107, 92, 231, 0.35)',
//                     borderRadius: '12px',
//                     color: 'rgba(255, 255, 255, 0.95)',
//                     fontWeight: '500'
//                   }}>
//                     {conversation.messages?.length || 0} messages
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Clear All Button */}
//         {conversations.length > 0 && (
//           <div style={{
//             padding: '16px',
//             borderTop: '1px solid rgba(107, 92, 231, 0.2)'
//           }}>
//             <button
//               onClick={handleClearAll}
//               style={{
//                 width: '100%',
//                 padding: '11px',
//                 background: 'transparent',
//                 border: '1px solid rgba(255, 84, 89, 0.4)',
//                 borderRadius: '10px',
//                 color: '#ff5459',
//                 fontSize: '13px',
//                 fontWeight: '500',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '6px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = 'rgba(255, 84, 89, 0.12)';
//                 e.currentTarget.style.borderColor = 'rgba(255, 84, 89, 0.6)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.borderColor = 'rgba(255, 84, 89, 0.4)';
//               }}
//             >
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <polyline points="3 6 5 6 21 6"></polyline>
//                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//               </svg>
//               Clear All Conversations
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default HistorySidebar;
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