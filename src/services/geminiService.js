// // import { GoogleGenerativeAI } from '@google/generative-ai';

// // class GeminiService {
// //   constructor() {
// //     this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
// //     this.modelName = process.env.REACT_APP_GEMINI_MODEL || 'gemini-1.5-flash';

// //     if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
// //       console.warn('Gemini API key not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file');
// //     }

// //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// //     this.model = this.genAI.getGenerativeModel({ model: this.modelName });
// //     this.chat = null;
// //   }

// //   initializeChat(history = []) {
// //     this.chat = this.model.startChat({
// //       history: history.map(msg => ({
// //         role: msg.role === 'assistant' ? 'model' : 'user',
// //         parts: [{ text: msg.content }]
// //       })),
// //       generationConfig: {
// //         temperature: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
// //         maxOutputTokens: parseInt(process.env.REACT_APP_MAX_TOKENS) || 2000,
// //       },
// //     });
// //   }

// //   async sendMessage(messages, onChunk) {
// //     try {
// //       // Initialize chat with history if not already done
// //       if (!this.chat) {
// //         const history = messages.slice(0, -1);
// //         this.initializeChat(history);
// //       }

// //       const lastMessage = messages[messages.length - 1];
// //       const result = await this.chat.sendMessageStream(lastMessage.content);

// //       let fullResponse = '';

// //       for await (const chunk of result.stream) {
// //         const chunkText = chunk.text();
// //         fullResponse += chunkText;
// //         if (onChunk) {
// //           onChunk(chunkText);
// //         }
// //       }

// //       return fullResponse;
// //     } catch (error) {
// //       console.error('Gemini API Error:', error);
// //       this.chat = null; // Reset chat on error
// //       throw new Error(this.handleError(error));
// //     }
// //   }

// //   resetChat() {
// //     this.chat = null;
// //   }

// //   handleError(error) {
// //     if (error.message?.includes('API key')) {
// //       return 'Invalid API key. Please check your REACT_APP_GEMINI_API_KEY in .env file';
// //     }
// //     if (error.message?.includes('quota')) {
// //       return 'API quota exceeded. Gemini free tier: 60 requests/minute';
// //     }
// //     if (error.message?.includes('SAFETY')) {
// //       return 'Content filtered by safety settings. Please rephrase your message';
// //     }
// //     return error.message || 'Failed to get response from Gemini';
// //   }
// // }

// // export default new GeminiService();







// import { GoogleGenerativeAI } from '@google/generative-ai';

// class GeminiService {
//   constructor() {
//     this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
//     this.modelName = process.env.REACT_APP_GEMINI_MODEL || 'gemini-1.5-flash';

//     if (!this.apiKey) {
//       console.warn('❌ Gemini API key not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file');
//     } else {
//       console.log('✅ Gemini API Key Loaded Successfully');
//     }

//     this.genAI = new GoogleGenerativeAI(this.apiKey);
//     this.model = this.genAI.getGenerativeModel({ model: this.modelName });
//     this.chat = null;
//   }

//   initializeChat(history = []) {
//     this.chat = this.model.startChat({
//       history: history.map(msg => ({
//         role: msg.role === 'assistant' ? 'model' : 'user',
//         parts: [{ text: msg.content }],
//       })),
//       generationConfig: {
//         temperature: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
//         maxOutputTokens: parseInt(process.env.REACT_APP_MAX_TOKENS) || 2000,
//       },
//     });
//   }

//   async sendMessage(messages, onChunk) {
//     try {
//       if (!this.chat) {
//         const history = messages.slice(0, -1);
//         this.initializeChat(history);
//       }

//       const lastMessage = messages[messages.length - 1];
//       const result = await this.chat.sendMessageStream(lastMessage.content);

//       let fullResponse = '';
//       for await (const chunk of result.stream) {
//         const chunkText = chunk.text();
//         fullResponse += chunkText;
//         if (onChunk) onChunk(chunkText);
//       }

//       return fullResponse;
//     } catch (error) {
//       console.error('💥 Gemini API Error:', error);
//       this.chat = null;
//       throw new Error(this.handleError(error));
//     }
//   }

//   resetChat() {
//     this.chat = null;
//   }

//   handleError(error) {
//     if (error.message?.includes('API key')) {
//       return 'Invalid API key. Please check your REACT_APP_GEMINI_API_KEY in .env file';
//     }
//     if (error.message?.includes('quota')) {
//       return 'API quota exceeded. Gemini free tier: 60 requests/minute';
//     }
//     if (error.message?.includes('SAFETY')) {
//       return 'Content filtered by safety settings. Please rephrase your message';
//     }
//     return error.message || 'Failed to get response from Gemini';
//   }
// }

// export default new GeminiService();




class GeminiService {
  constructor() {
    this.apiUrl = '/api/gemini';
    console.log('✅ GeminiService initialized - using backend proxy');
  }

  async sendMessage(messages, onChunk) {
    try {
      const response = await fetch(`${this.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from Gemini');
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            
            if (data === '[DONE]') {
              return fullResponse;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullResponse += parsed.text;
                if (onChunk) {
                  onChunk(parsed.text);
                }
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      return fullResponse;

    } catch (error) {
      console.error('❌ Gemini Service Error:', error);
      throw new Error(this.handleError(error));
    }
  }

  async resetChat() {
    try {
      await fetch(`${this.apiUrl}/reset`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  }

  handleError(error) {
    if (error.message?.includes('API key')) {
      return 'Invalid API key. Please check your REACT_APP_GEMINI_API_KEY in .env file';
    }
    if (error.message?.includes('quota')) {
      return 'API quota exceeded. Gemini free tier: 60 requests/minute';
    }
    if (error.message?.includes('SAFETY')) {
      return 'Content filtered by safety settings. Please rephrase your message';
    }
    if (error.message?.includes('Failed to fetch')) {
      return 'Cannot connect to backend server. Make sure server.js is running on port 5000';
    }
    return error.message || 'Failed to get response from Gemini';
  }
}

export default new GeminiService();
