🤖 Advanced AI Chatbot
A modern, production-ready conversational AI chatbot built with React, supporting voice input, file uploads, real-time AI streaming, and flexible AI provider integration (Groq, OpenAI, Gemini, and more).

Live Demo: your-vercel-url.vercel.app

🌟 Features
Core Functionality
🔐 User Authentication - Secure register, login, and session management

💬 Real-time AI Responses - Streaming responses from multiple AI providers

🎤 Voice Input & Output - Speech-to-Text and Text-to-Speech capabilities

📁 File Upload Support - Handle text, images, PDFs, and more

💾 Persistent Chat History - Save, load, search, and manage conversations

✏️ Message Actions - Edit, regenerate, and delete messages

User Experience
🎨 Modern UI Design - Beautiful gradient sidebar with conversation cards

📝 Markdown Rendering - Clean formatting for AI responses

💻 Syntax Highlighting - Code blocks with copy-to-clipboard

🔍 Search Conversations - Quickly find past chats

✏️ Rename Conversations - Organize your chat history

📱 Fully Responsive - Works on desktop, tablet, and mobile

AI Provider Support
⚡ Groq - Ultra-fast, free inference

🤖 OpenAI - GPT models (GPT-3.5, GPT-4)

🔮 Google Gemini - Gemini Pro models

🔧 Multi-Provider - Easy to add more providers

🚀 Quick Start
Prerequisites
Node.js 16+ and npm installed

API key from at least one AI provider (Groq recommended - free!)

Installation
bash
# Clone the repository
git clone https://github.com/your-username/ai-chatbot.git
cd ai-chatbot

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API keys to .env file
# Edit .env and add your keys

# Start development server
npm start
The app will open at http://localhost:3000

🔑 Environment Variables
Create a .env file in the root directory:

text
# AI Provider Configuration (choose one or multiple)
REACT_APP_AI_PROVIDER=groq

# Groq API (Recommended - Free & Fast)
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
REACT_APP_GROQ_MODEL=llama-3.3-70b-versatile

# OpenAI API (Optional)
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_OPENAI_MODEL=gpt-3.5-turbo

# Google Gemini API (Optional)
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_GEMINI_MODEL=gemini-pro
Getting API Keys
Groq (Recommended - FREE):

Visit console.groq.com

Sign up for a free account

Generate API key from dashboard

No credit card required!

OpenAI:

Visit platform.openai.com

Create account and add payment method

Generate API key from API keys section

Google Gemini:

Visit makersuite.google.com/app/apikey

Sign in with Google account

Generate API key

🛠️ Tech Stack
Frontend
React 18 - UI framework

React Hooks - State management

Context API - Global state (Auth, Chat History)

LocalStorage - Data persistence

AI & APIs
Groq API - Fast, free AI inference

OpenAI API - GPT models

Google Gemini API - Gemini models

Streaming Responses - Real-time AI output

Features & Libraries
React Markdown - Markdown rendering

React Syntax Highlighter - Code highlighting

React Speech Recognition - Voice input

Web Speech API - Text-to-speech

File Reader API - File uploads

Styling
CSS3 - Custom styling with CSS variables

CSS Grid & Flexbox - Responsive layouts

Animations - Smooth transitions and effects

Dark Theme - Modern dark mode design

📂 Project Structure
text
ai-chatbot/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ChatContainer.js       # Main chat interface
│   │   ├── ChatContainer.css
│   │   ├── ChatInput.js           # Message input with voice
│   │   ├── ChatInput.css
│   │   ├── ChatMessage.js         # Message display with markdown
│   │   ├── ChatMessage.css
│   │   ├── HistorySidebar.js      # Conversation history
│   │   ├── HistorySidebar.css
│   │   ├── Login.js               # Login page
│   │   ├── Register.js            # Registration page
│   │   └── Auth.css               # Auth styling
│   ├── context/
│   │   ├── AuthContext.js         # Authentication state
│   │   └── ChatHistoryContext.js  # Chat history management
│   ├── services/
│   │   └── chatService.js         # AI provider integration
│   ├── utils/
│   │   └── textToSpeech.js        # TTS functionality
│   ├── App.js                     # Root component
│   ├── App.css                    # Global styles
│   └── index.js                   # Entry point
├── .env.example                   # Environment template
├── .gitignore
├── package.json
└── README.md
🎯 Usage
First Time Setup
Register an Account

Click "Sign up" on login screen

Enter name, email, and password

Account saved locally

Login

Enter your credentials

Stay logged in even after page refresh

Start Chatting

Type your message or click microphone for voice input

AI responds in real-time with streaming

Messages are auto-saved

Features Guide
Voice Input:

Click microphone icon in input box

Speak your message

Watch it transcribe in real-time

Click mic again to stop

File Upload:

Click attachment icon

Select file (text, PDF, image, etc.)

File content sent to AI for analysis

Chat History:

Click "History" button to open sidebar

Search conversations

Click to load a conversation

Rename by clicking edit icon

Delete with trash icon

Message Actions:

Hover over any message

Edit, regenerate, or delete

Copy message content

🚀 Deployment
Deploy to Vercel (Recommended)
Push to GitHub

bash
git add .
git commit -m "Initial commit"
git push origin main
Import to Vercel

Go to vercel.com

Click "Import Project"

Select your GitHub repository

Vercel auto-detects React

Add Environment Variables

Go to Project Settings → Environment Variables

Add all your API keys from .env

Apply to all environments

Deploy

Click Deploy

Your app will be live in minutes!

Deploy to Netlify
bash
# Build the project
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod
Add environment variables in Netlify dashboard under Site Settings → Environment Variables.

