// import React, { useState } from 'react';
// import './ChatInput.css';

// const ChatInput = ({ onSendMessage, disabled }) => {
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() && !disabled && onSendMessage) {
//       onSendMessage(message);
//       setMessage('');
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="chat-input-form">
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Message AI... (Shift+Enter for new line)"
//         disabled={disabled}
//         rows={1}
//         className="chat-input-textarea"
//       />
//       <button 
//         type="submit" 
//         disabled={disabled || !message.trim()}
//         className="send-button"
//       >
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <line x1="22" y1="2" x2="11" y2="13"></line>
//           <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//         </svg>
//       </button>
//     </form>
//   );
// };

// export default ChatInput;
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, disabled, onFileClick }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Update input with voice transcript in real-time
  useEffect(() => {
    if (listening && transcript) {
      setMessage(transcript);
    }
  }, [transcript, listening]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && onSendMessage) {
      onSendMessage(message);
      setMessage('');
      resetTranscript();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleVoiceInput = () => {
    if (listening) {
      // Stop listening
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      // Start listening
      setIsListening(true);
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <div className="input-wrapper">
        {/* Attach Button */}
        <button 
          type="button"
          className="input-icon-btn attach-btn"
          onClick={onFileClick}
          title="Attach file"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>

        {/* Text Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={listening ? "Listening... speak now" : "Message AI... (Shift+Enter for new line)"}
          disabled={disabled}
          rows={1}
          className="chat-input-textarea"
        />

        {/* Mic Button with listening state */}
        {browserSupportsSpeechRecognition && (
          <button 
            type="button"
            className={`input-icon-btn mic-btn ${listening ? 'listening' : ''}`}
            onClick={toggleVoiceInput}
            title={listening ? "Stop recording" : "Voice input"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Send Button */}
      <button 
        type="submit" 
        disabled={disabled || !message.trim()}
        className="send-button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
