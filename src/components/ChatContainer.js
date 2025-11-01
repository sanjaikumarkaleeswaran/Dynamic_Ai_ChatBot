// import React, { useState, useEffect, useRef } from 'react';
// import ChatMessage from './ChatMessage';
// import ChatInput from './ChatInput';
// import VoiceInput from './VoiceInput';
// import FileUpload from './FileUpload';
// import HistorySidebar from './HistorySidebar';
// import { useAuth } from '../context/AuthContext';
// import { useChatHistory } from '../context/ChatHistoryContext';
// import chatService from '../services/chatService';
// import { speakText, stopSpeaking } from '../utils/textToSpeech';

// import './ChatContainer.css';

// const ChatContainer = () => {
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);
//   const messagesEndRef = useRef(null);
//   const { user, logout } = useAuth();
//   const { saveConversation, loadConversation } = useChatHistory();

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//  const handleSendMessage = async (content) => {
//   if (!content.trim()) return;

//   const userMessage = {
//     id: Date.now(),
//     role: 'user',
//     content: content.trim(),
//     timestamp: new Date().toISOString()
//   };

//   setMessages(prev => [...prev, userMessage]);
//   setIsLoading(true);

//   try {
//     const chatMessages = [
//       ...messages.map(m => ({ role: m.role, content: m.content })),
//       { role: 'user', content: content.trim() }
//     ];

//     let aiResponse = '';
//     const aiMessage = {
//       id: Date.now() + 1,
//       role: 'assistant',
//       content: '',
//       timestamp: new Date().toISOString()
//     };

//     setMessages(prev => [...prev, aiMessage]);

//     await chatService.sendMessage(chatMessages, (chunk) => {
//       aiResponse += chunk;
//       setMessages(prev => {
//         const newMessages = [...prev];
//         newMessages[newMessages.length - 1].content = aiResponse;
//         return newMessages;
//       });
//     });

//     // ✅ FIXED: Auto-save after AI responds
//     const finalMessages = [...messages, userMessage, { ...aiMessage, content: aiResponse }];
    
//     // Generate a title from the first user message
//     const title = messages.length === 0 
//       ? content.trim().substring(0, 50) + (content.length > 50 ? '...' : '')
//       : `Chat from ${new Date().toLocaleDateString()}`;
    
//     saveConversation(finalMessages, title);

//   } catch (error) {
//     console.error('Error sending message:', error);
//     setMessages(prev => [...prev, {
//       id: Date.now() + 1,
//       role: 'assistant',
//       content: `Error: ${error.message || 'Failed to get response'}`,
//       timestamp: new Date().toISOString()
//     }]);
//   } finally {
//     setIsLoading(false);
//   }
// };


//   const handleVoiceInput = (transcript) => {
//     handleSendMessage(transcript);
//   };

//   const handleFileUpload = (file) => {
//     const fileMessage = `I've uploaded a file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)\n\nContent:\n${file.content.substring(0, 500)}...`;
//     handleSendMessage(fileMessage);
//   };

//   const handleEditMessage = (id, newContent) => {
//     setMessages(prev => prev.map(msg => 
//       msg.id === id ? { ...msg, content: newContent } : msg
//     ));
//   };

//   const handleRegenerateMessage = async (id) => {
//     const messageIndex = messages.findIndex(m => m.id === id);
//     if (messageIndex === -1) return;

//     const previousMessages = messages.slice(0, messageIndex);
//     setMessages(previousMessages);
    
//     const lastUserMessage = previousMessages.reverse().find(m => m.role === 'user');
//     if (lastUserMessage) {
//       handleSendMessage(lastUserMessage.content);
//     }
//   };

//   const handleDeleteMessage = (id) => {
//     setMessages(prev => prev.filter(msg => msg.id !== id));
//   };

//   const handleLoadConversation = (id) => {
//     const conversation = loadConversation(id);
//     if (conversation) {
//       setMessages(conversation.messages);
//       setShowHistory(false);
//     }
//   };
// const handleNewChat = () => {
//   if (messages.length > 0) {
//     // Save current conversation before starting new one
//     const title = messages[0]?.content.substring(0, 50) + '...' || `Chat ${new Date().toLocaleDateString()}`;
//     saveConversation(messages, title);
//   }
//   setMessages([]);
// };

//   const handleSpeakMessage = (content) => {
//     speakText(content);
//   };

//   return (
//     <div className="chat-container">
//       {showHistory && (
//   <HistorySidebar
//     onSelectConversation={handleLoadConversation}
//     onClose={() => setShowHistory(false)}
//     onNewChat={handleNewChat}
//   />
// )}

//       <div className="chat-header">
//         <button onClick={() => setShowHistory(!showHistory)} className="history-btn">
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <polyline points="1 4 1 10 7 10"></polyline>
//             <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
//           </svg>
//           History
//         </button>

//         <div className="header-info">
//           <h1>AI Chat Assistant</h1>
//           <span>{user?.name || 'User'}</span>
//         </div>

//         <div className="header-actions">
//           <button onClick={handleNewChat} className="new-chat-btn">
//             New Chat
//           </button>
//           <button onClick={logout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="messages-container">
//         {messages.length === 0 ? (
//           <div className="welcome-message">
//             <h2>Welcome to AI Chat Assistant! 👋</h2>
//             <p>Start a conversation or ask me anything!</p>
//           </div>
//         ) : (
//           messages.map((message) => (
//             <ChatMessage
//               key={message.id}
//               message={message}
//               isUser={message.role === 'user'}
//               onEdit={handleEditMessage}
//               onRegenerate={handleRegenerateMessage}
//               onDelete={handleDeleteMessage}
//               onSpeak={handleSpeakMessage}
//             />
//           ))
//         )}
//         {isLoading && (
//           <div className="typing-indicator">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
// <div className="input-container">
//   <ChatInput 
//     onSendMessage={handleSendMessage} 
//     disabled={isLoading}
//     onFileClick={() => {
//       const fileInput = document.createElement('input');
//       fileInput.type = 'file';
//       fileInput.accept = '.txt,.md,.json,.csv,.pdf,.png,.jpg,.jpeg,.gif';
//       fileInput.onchange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//           const reader = new FileReader();
//           reader.onload = () => {
//             handleFileUpload({
//               name: file.name,
//               type: file.type,
//               size: file.size,
//               content: reader.result
//             });
//           };
//           if (file.type.startsWith('text/') || file.type === 'application/json') {
//             reader.readAsText(file);
//           } else {
//             reader.readAsDataURL(file);
//           }
//         }
//       };
//       fileInput.click();
//     }}
//   />
// </div>

//     </div>
//   );
// };

// export default ChatContainer;




import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import HistorySidebar from './HistorySidebar';
import { useAuth } from '../context/AuthContext';
import { useChatHistory } from '../context/ChatHistoryContext';
import { useTheme } from '../context/ThemeContext';
import chatService from '../services/chatService';
import { speakText } from '../utils/textToSpeech';

import './ChatContainer.css';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const { user, logout } = useAuth();
  const { saveConversation, loadConversation } = useChatHistory();
  const { theme, toggleTheme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatMessages = [
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: content.trim() }
      ];

      let aiResponse = '';
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      await chatService.sendMessage(chatMessages, (chunk) => {
        aiResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = aiResponse;
          return newMessages;
        });
      });

      const finalMessages = [...messages, userMessage, { ...aiMessage, content: aiResponse }];
      const title = messages.length === 0 
        ? content.trim().substring(0, 50) + (content.length > 50 ? '...' : '')
        : `Chat from ${new Date().toLocaleDateString()}`;
      saveConversation(finalMessages, title);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Error: ${error.message || 'Failed to get response'}`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Export Features ---
  const exportAsJSON = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsText = () => {
    const text = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyAllMessages = () => {
    const text = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    alert('All messages copied to clipboard!');
  };

  // --- End Export Features ---

  const handleEditMessage = (id, newContent) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, content: newContent } : msg
    ));
  };

  const handleRegenerateMessage = async (id) => {
    const messageIndex = messages.findIndex(m => m.id === id);
    if (messageIndex === -1) return;

    const previousMessages = messages.slice(0, messageIndex);
    setMessages(previousMessages);

    const lastUserMessage = previousMessages.reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  const handleDeleteMessage = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const handleLoadConversation = (id) => {
    const conversation = loadConversation(id);
    if (conversation) {
      setMessages(conversation.messages);
      setShowHistory(false);
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      const title = messages[0]?.content.substring(0, 50) + '...' || `Chat ${new Date().toLocaleDateString()}`;
      saveConversation(messages, title);
    }
    setMessages([]);
  };

  // Keyboard Shortcuts (Ctrl+K = search, Ctrl+N = new chat, etc.)
  useEffect(() => {
    const listener = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        setShowHistory(true);
        e.preventDefault();
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'n') {
        handleNewChat();
        e.preventDefault();
      }
      if (e.key === 'Escape') {
        setShowHistory(false);
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [messages, showHistory]);

  return (
    <div className="chat-container">
      {showHistory && (
        <HistorySidebar
          onSelectConversation={handleLoadConversation}
          onClose={() => setShowHistory(false)}
          onNewChat={handleNewChat}
        />
      )}

      <div className="chat-header">
        <button onClick={() => setShowHistory(!showHistory)} className="history-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          <span>History</span>
        </button>

        <div className="header-info">
          <h1>AI Chat Assistant</h1>
          <span>{user?.name || 'User'}</span>
        </div>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          {messages.length > 0 && (
            <div className="export-dropdown">
              <button className="export-btn" title="Export">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export
              </button>
              <div className="export-menu">
                <button onClick={exportAsJSON}>Export as JSON</button>
                <button onClick={exportAsText}>Export as Text</button>
                <button onClick={copyAllMessages}>Copy All</button>
              </div>
            </div>
          )}
          <button onClick={handleNewChat} className="new-chat-btn">
            New Chat
          </button>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to AI Chat Assistant! 👋</h2>
            <p>Start a conversation or ask me anything!</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isUser={message.role === 'user'}
              onEdit={handleEditMessage}
              onRegenerate={handleRegenerateMessage}
              onDelete={handleDeleteMessage}
              onSpeak={speakText}
              showCopy
            />
          ))
        )}
        {isLoading && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isLoading}
          onFileClick={() => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.txt,.md,.json,.csv,.pdf,.png,.jpg,.jpeg,.gif';
            fileInput.onchange = (e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  handleSendMessage(
                    `I've uploaded a file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)\n\nContent:\n${reader.result.substring(0, 500)}...`
                  );
                };
                if (file.type.startsWith('text/') || file.type === 'application/json') {
                  reader.readAsText(file);
                } else {
                  reader.readAsDataURL(file);
                }
              }
            };
            fileInput.click();
          }}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
