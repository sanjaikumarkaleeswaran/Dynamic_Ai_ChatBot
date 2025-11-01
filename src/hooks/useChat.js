import { useState, useCallback, useEffect } from 'react';
import chatService from '../services/chatService';
import { storage } from '../utils/storage';

export function useChat() {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load conversations from storage on mount
  useEffect(() => {
    const saved = storage.loadChats();
    if (saved.length > 0) {
      setConversations(saved);
      setCurrentConversationId(saved[0].id);
    } else {
      // Create initial conversation
      const newConv = createNewConversation();
      setConversations([newConv]);
      setCurrentConversationId(newConv.id);
    }
  }, []);

  // Save conversations to storage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      storage.saveChats(conversations);
    }
  }, [conversations]);

  const createNewConversation = () => ({
    id: Date.now().toString(),
    title: 'New Chat',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const getCurrentConversation = useCallback(() => {
    return conversations.find(c => c.id === currentConversationId);
  }, [conversations, currentConversationId]);

  const addMessage = useCallback((role, content) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const newMessages = [...conv.messages, { role, content, timestamp: new Date().toISOString() }];

        // Auto-generate title from first user message
        let title = conv.title;
        if (role === 'user' && conv.messages.length === 0) {
          title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        }

        return {
          ...conv,
          messages: newMessages,
          title,
          updatedAt: new Date().toISOString()
        };
      }
      return conv;
    }));
  }, [currentConversationId]);

  const updateLastMessage = useCallback((content) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const messages = [...conv.messages];
        if (messages.length > 0) {
          messages[messages.length - 1] = {
            ...messages[messages.length - 1],
            content
          };
        }
        return {
          ...conv,
          messages,
          updatedAt: new Date().toISOString()
        };
      }
      return conv;
    }));
  }, [currentConversationId]);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    setError(null);
    setIsLoading(true);

    try {
      // Add user message
      addMessage('user', content);

      // Prepare messages for API
      const currentConv = getCurrentConversation();
      const messages = [
        ...currentConv.messages,
        { role: 'user', content }
      ];

      // Add empty assistant message that will be updated with streaming
      addMessage('assistant', '');

      let fullResponse = '';

      // Send to AI with streaming callback
      await chatService.sendMessage(messages, (chunk) => {
        fullResponse += chunk;
        updateLastMessage(fullResponse);
      });

    } catch (err) {
      setError(err.message);
      // Remove the failed assistant message
      setConversations(prev => prev.map(conv => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: conv.messages.slice(0, -1)
          };
        }
        return conv;
      }));
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, getCurrentConversation, updateLastMessage, currentConversationId]);

  const newConversation = useCallback(() => {
    const newConv = createNewConversation();
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
    chatService.resetChat();
    setError(null);
  }, []);

  const deleteConversation = useCallback((id) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length === 0) {
        const newConv = createNewConversation();
        return [newConv];
      }
      return filtered;
    });

    if (currentConversationId === id) {
      setCurrentConversationId(conversations[0]?.id);
    }
  }, [currentConversationId, conversations]);

  const clearAllConversations = useCallback(() => {
    const newConv = createNewConversation();
    setConversations([newConv]);
    setCurrentConversationId(newConv.id);
    storage.clearChats();
    chatService.resetChat();
    setError(null);
  }, []);

  return {
    conversations,
    currentConversation: getCurrentConversation(),
    currentConversationId,
    isLoading,
    error,
    sendMessage,
    newConversation,
    setCurrentConversationId,
    deleteConversation,
    clearAllConversations
  };
}