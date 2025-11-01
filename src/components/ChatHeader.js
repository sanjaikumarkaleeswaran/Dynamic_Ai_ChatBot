import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './ChatHeader.css';

function ChatHeader({ onToggleSidebar, currentConversation }) {
  const { theme, toggleTheme } = useTheme();
  const provider = process.env.REACT_APP_AI_PROVIDER || 'openai';
  const model = provider === 'openai' 
    ? process.env.REACT_APP_OPENAI_MODEL 
    : process.env.REACT_APP_GEMINI_MODEL;

  return (
    <header className="chat-header">
      <button 
        className="menu-button"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="header-info">
        <h1>{currentConversation?.title || 'AI Chatbot'}</h1>
        <span className="header-model">
          Powered by {provider === 'openai' ? 'OpenAI' : 'Gemini'} • {model}
        </span>
      </div>

      <button 
        className="theme-button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export default ChatHeader;