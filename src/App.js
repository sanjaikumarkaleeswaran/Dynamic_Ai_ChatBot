import React from 'react';
import ChatContainer from './components/ChatContainer';
import { ThemeProvider } from './hooks/useTheme';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ChatContainer />
    </ThemeProvider>
  );
}

export default App;