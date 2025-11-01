import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import { useChat } from '../hooks/useChat';
import './ChatContainer.css';

function ChatContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chat = useChat();

  return (
    <div className="chat-container">
      <Sidebar
        conversations={chat.conversations}
        currentId={chat.currentConversationId}
        onSelect={chat.setCurrentConversationId}
        onNew={chat.newConversation}
        onDelete={chat.deleteConversation}
        onClearAll={chat.clearAllConversations}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="chat-main">
        <ChatHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          currentConversation={chat.currentConversation}
        />

        <ChatMessages
          messages={chat.currentConversation?.messages || []}
          isLoading={chat.isLoading}
          error={chat.error}
        />

        <ChatInput
          onSend={chat.sendMessage}
          disabled={chat.isLoading}
        />
      </div>
    </div>
  );
}

export default ChatContainer;