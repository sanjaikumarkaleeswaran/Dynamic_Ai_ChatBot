import React, { useState } from 'react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatHistoryProvider } from './context/ChatHistoryContext';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {showRegister ? (
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </>
    );
  }

  return (
    <div className="App">
      <ChatContainer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatHistoryProvider>
          <AppContent />
        </ChatHistoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
