// LocalStorage helper for chat history
const STORAGE_KEY = 'ai_chatbot_history';

export const storage = {
  saveChats(chats) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch (error) {
      console.error('Failed to save chats:', error);
    }
  },

  loadChats() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load chats:', error);
      return [];
    }
  },

  clearChats() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear chats:', error);
    }
  },

  saveTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },

  loadTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      console.error('Failed to load theme:', error);
      return null;
    }
  }
};