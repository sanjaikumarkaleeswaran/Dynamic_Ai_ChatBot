import React, { createContext, useState, useContext, useEffect } from 'react';

const ChatHistoryContext = createContext();

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error('useChatHistory must be used within ChatHistoryProvider');
  }
  return context;
};

export const ChatHistoryProvider = ({ children }) => {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('chatbot-conversations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chatbot-conversations', JSON.stringify(conversations));
  }, [conversations]);

  const saveConversation = (messages, title) => {
    const newConversation = {
      id: Date.now(),
      title: title || `Chat ${conversations.length + 1}`,
      messages,
      timestamp: new Date().toISOString()
    };
    setConversations(prev => [newConversation, ...prev]);
    return newConversation.id;
  };

  const loadConversation = (id) => {
    return conversations.find(conv => conv.id === id);
  };

  const deleteConversation = (id) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
  };

  const clearAllConversations = () => {
    setConversations([]);
    localStorage.removeItem('chatbot-conversations');
  };

  const updateConversationTitle = (id, newTitle) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, title: newTitle } : conv
      )
    );
  };
  

  return (
    <ChatHistoryContext.Provider value={{
      conversations,
      saveConversation,
      loadConversation,
      deleteConversation,
      clearAllConversations,
      updateConversationTitle
    }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};
