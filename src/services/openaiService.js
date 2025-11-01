// import OpenAI from 'openai';

// class OpenAIService {
//   constructor() {
//     this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
//     this.model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o-mini';

//     if (!this.apiKey || this.apiKey === 'your_openai_api_key_here') {
//       console.warn('OpenAI API key not configured. Please add REACT_APP_OPENAI_API_KEY to your .env file');
//     }

//     this.client = new OpenAI({
//       apiKey: this.apiKey,
//       dangerouslyAllowBrowser: true // Only for demo. Use backend proxy in production!
//     });
//   }

//   async sendMessage(messages, onChunk) {
//     try {
//       const stream = await this.client.chat.completions.create({
//         model: this.model,
//         messages: messages.map(msg => ({
//           role: msg.role,
//           content: msg.content
//         })),
//         stream: true,
//         temperature: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
//         max_tokens: parseInt(process.env.REACT_APP_MAX_TOKENS) || 2000,
//       });

//       let fullResponse = '';

//       for await (const chunk of stream) {
//         const content = chunk.choices[0]?.delta?.content || '';
//         if (content) {
//           fullResponse += content;
//           if (onChunk) {
//             onChunk(content);
//           }
//         }
//       }

//       return fullResponse;
//     } catch (error) {
//       console.error('OpenAI API Error:', error);
//       throw new Error(this.handleError(error));
//     }
//   }

//   handleError(error) {
//     if (error.message?.includes('API key')) {
//       return 'Invalid API key. Please check your REACT_APP_OPENAI_API_KEY in .env file';
//     }
//     if (error.message?.includes('rate limit')) {
//       return 'Rate limit exceeded. Please wait a moment and try again';
//     }
//     if (error.message?.includes('quota')) {
//       return 'API quota exceeded. Please check your OpenAI account billing';
//     }
//     return error.message || 'Failed to get response from OpenAI';
//   }
// }

// export default new OpenAIService();





import OpenAI from 'openai';

class OpenAIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o-mini';
    
    // Only initialize if API key exists
    if (this.apiKey && this.apiKey !== 'your_openai_api_key_here') {
      this.client = new OpenAI({
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true
      });
    } else {
      this.client = null;
      console.warn('OpenAI API key not configured. OpenAI features will be disabled.');
    }
  }

  async sendMessage(messages, onChunk) {
    if (!this.client) {
      throw new Error('OpenAI API key not configured. Please add REACT_APP_OPENAI_API_KEY to your .env file or switch to Gemini provider.');
    }

    try {
      const stream = await this.client.chat.completions.create({
        model: this.model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        stream: true,
        temperature: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
        max_tokens: parseInt(process.env.REACT_APP_MAX_TOKENS) || 2000,
      });

      let fullResponse = '';
      
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          if (onChunk) {
            onChunk(content);
          }
        }
      }

      return fullResponse;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(this.handleError(error));
    }
  }

  handleError(error) {
    if (error.message?.includes('API key')) {
      return 'Invalid API key. Please check your REACT_APP_OPENAI_API_KEY in .env file';
    }
    if (error.message?.includes('rate limit')) {
      return 'Rate limit exceeded. Please wait a moment and try again';
    }
    if (error.message?.includes('quota')) {
      return 'API quota exceeded. Please check your OpenAI account billing';
    }
    return error.message || 'Failed to get response from OpenAI';
  }
}

export default new OpenAIService();
