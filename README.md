# Advanced AI Chatbot with Real API Integration

A production-ready AI chatbot powered by **OpenAI GPT-4** or **Google Gemini API** with streaming responses, chat history, markdown support, and modern UI.

## 🌟 Features

### Core AI Features
- ✅ **Real AI Integration** - OpenAI GPT-4 or Google Gemini
- ✅ **Streaming Responses** - Real-time token streaming like ChatGPT
- ✅ **Multi-Turn Conversations** - Maintains conversation context
- ✅ **Smart Memory** - Remembers previous messages in the conversation

### User Interface
- ✅ **Modern Design** - Clean, professional UI with animations
- ✅ **Dark/Light Theme** - Automatic and manual theme switching
- ✅ **Markdown Support** - Rich text formatting in responses
- ✅ **Code Highlighting** - Syntax highlighting for code blocks
- ✅ **Responsive** - Works on desktop, tablet, and mobile

### Advanced Features
- ✅ **Chat History** - Save and load previous conversations
- ✅ **Export Chat** - Download conversations as text/JSON
- ✅ **Clear Chat** - Start fresh conversations
- ✅ **Error Handling** - Graceful error messages and retry logic
- ✅ **Loading States** - Beautiful loading animations
- ✅ **Token Usage** - Track API usage (optional)

## 🚀 Quick Start

### 1. Get Your API Key

#### For OpenAI (Recommended - Most Powerful):
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key

**Free Tier:** $5 free credits for new accounts

#### For Google Gemini (Free - Good Alternative):
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Get API key"
4. Copy your API key

**Free Tier:** 60 queries per minute, unlimited usage

### 2. Install the Project

```bash
# Extract the ZIP file
cd ai-chatbot-advanced

# Install dependencies
npm install
```

### 3. Configure API Keys

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

**For OpenAI:**
```env
REACT_APP_AI_PROVIDER=openai
REACT_APP_OPENAI_API_KEY=sk-your-actual-api-key-here
REACT_APP_OPENAI_MODEL=gpt-4o-mini
```

**For Google Gemini:**
```env
REACT_APP_AI_PROVIDER=gemini
REACT_APP_GEMINI_API_KEY=your-actual-gemini-key-here
REACT_APP_GEMINI_MODEL=gemini-1.5-flash
```

### 4. Run the Application

```bash
npm start
```

Opens at: `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
ai-chatbot-advanced/
├── src/
│   ├── components/
│   │   ├── ChatContainer.js       # Main chat interface
│   │   ├── ChatHeader.js          # Header with theme toggle
│   │   ├── ChatMessages.js        # Message list container
│   │   ├── Message.js             # Individual message component
│   │   ├── ChatInput.js           # Input field and send button
│   │   ├── Sidebar.js             # Chat history sidebar
│   │   └── ExportModal.js         # Export functionality
│   ├── services/
│   │   ├── openaiService.js       # OpenAI API integration
│   │   ├── geminiService.js       # Gemini API integration
│   │   └── chatService.js         # Unified chat service
│   ├── hooks/
│   │   ├── useChat.js             # Chat state management
│   │   └── useTheme.js            # Theme management
│   ├── utils/
│   │   ├── storage.js             # LocalStorage helper
│   │   └── formatters.js          # Text formatting utilities
│   └── styles/
│       └── variables.css          # CSS variables
├── .env.example                   # Environment variables template
└── README.md                      # This file
```

## 🎯 Usage Examples

### Basic Conversation
Simply type your question and press Enter or click Send. The AI will respond in real-time with streaming.

### Code Questions
Ask for code examples:
- "Write a Python function to sort an array"
- "Explain React hooks with examples"
- "Create a REST API in Node.js"

The AI will provide formatted code with syntax highlighting.

### Multi-turn Conversations
The chatbot remembers your conversation:
- "What's the capital of France?"
- "What's the population of that city?"
- "Tell me about its history"

### Export Conversations
Click the export button to download your chat as:
- Plain text (.txt)
- JSON format (.json)
- Markdown (.md)

## 🔧 Configuration

### Change AI Model

Edit `.env`:

**OpenAI Models:**
- `gpt-4o-mini` - Fast, cheap, good quality (Recommended)
- `gpt-4o` - Most powerful, slower, expensive
- `gpt-3.5-turbo` - Fast, cheapest

**Gemini Models:**
- `gemini-1.5-flash` - Fast, free (Recommended)
- `gemini-1.5-pro` - Most capable
- `gemini-1.0-pro` - Stable, reliable

### Adjust Response Style

In `.env`:
```env
REACT_APP_TEMPERATURE=0.7  # 0.0 = focused, 1.0 = creative
REACT_APP_MAX_TOKENS=2000  # Response length limit
```

## 🌐 Deploy to Production

### Deploy to Vercel (Free):

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Deploy to Netlify (Free):

```bash
npm run build
# Drag and drop the 'build' folder to Netlify
```

Add environment variables in Netlify dashboard.

### Deploy to GitHub Pages:

```bash
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/ai-chatbot-advanced",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

npm run deploy
```

## 💰 Cost Estimates

### OpenAI GPT-4o-mini:
- **$0.15** per 1M input tokens
- **$0.60** per 1M output tokens
- Average conversation (10 messages): ~$0.01

### Google Gemini:
- **Free** up to 60 requests/minute
- Generous free tier for personal projects

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use environment variables** - Never hardcode API keys
3. **Rotate API keys** regularly
4. **Set usage limits** in OpenAI/Gemini dashboard
5. **For production**: Use backend proxy to hide API keys

## 🐛 Troubleshooting

### "API key not found"
- Check `.env` file exists in root directory
- Verify key starts with `sk-` (OpenAI) or is valid (Gemini)
- Restart development server after changing `.env`

### "Rate limit exceeded"
- Wait a minute and try again
- Upgrade to paid tier for higher limits

### "Network error"
- Check internet connection
- Verify API key is valid
- Check OpenAI/Gemini service status

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [React Documentation](https://react.dev)

## 📄 License

MIT License - Free to use for personal and commercial projects

## 🤝 Contributing

Feel free to fork, modify, and use this project as a base for your own AI applications!

---

**Built with ❤️ using React, OpenAI, and Google Gemini**
