import React, { useEffect, useRef } from 'react';
import Message from './Message';
import './ChatMessages.css';

function ChatMessages({ messages, isLoading, error }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="chat-messages">
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h2>Start a Conversation</h2>
          <p>Ask me anything! I'm powered by advanced AI and can help with:</p>
          <ul className="examples-list">
            <li>💡 Answer questions and explain concepts</li>
            <li>💻 Write and debug code</li>
            <li>✍️ Create content and brainstorm ideas</li>
            <li>📚 Summarize and analyze information</li>
            <li>🎯 Solve problems and provide advice</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}

      {isLoading && (
        <div className="message assistant-message">
          <div className="message-avatar">🤖</div>
          <div className="message-content">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;