// // // import openaiService from './openaiService';
// // // import geminiService from './geminiService';

// // // class ChatService {
// // //   constructor() {
// // //     this.provider = process.env.REACT_APP_AI_PROVIDER || 'openai';
// // //   }

// // //   async sendMessage(messages, onChunk) {
// // //     if (this.provider === 'gemini') {
// // //       return await geminiService.sendMessage(messages, onChunk);
// // //     } else {
// // //       return await openaiService.sendMessage(messages, onChunk);
// // //     }
// // //   }

// // //   resetChat() {
// // //     if (this.provider === 'gemini') {
// // //       geminiService.resetChat();
// // //     }
// // //   }

// // //   getProvider() {
// // //     return this.provider;
// // //   }
// // // }

// // // export default new ChatService();







// // import openaiService from './openaiService';
// // import geminiService from './geminiService';

// // class ChatService {
// //   constructor() {
// //     this.provider = process.env.REACT_APP_AI_PROVIDER || 'gemini';
// //   }

// //   async sendMessage(messages, onChunk) {
// //     if (this.provider === 'gemini') {
// //       return await geminiService.sendMessage(messages, onChunk);
// //     } else {
// //       return await openaiService.sendMessage(messages, onChunk);
// //     }
// //   }

// //   resetChat() {
// //     if (this.provider === 'gemini') {
// //       geminiService.resetChat();
// //     }
// //   }

// //   getProvider() {
// //     return this.provider;
// //   }
// // }

// // export default new ChatService();





// import openaiService from './openaiService';
// import geminiService from './geminiService';
// import huggingfaceService from './huggingfaceService';
// import mockService from './mockService';

// class ChatService {
//   constructor() {
//     this.service = this.getService();
//     const provider = process.env.REACT_APP_AI_PROVIDER || 'openai';
//     console.log(`🤖 Using AI Provider: ${provider}`);
//   }

//   getService() {
//     const provider = process.env.REACT_APP_AI_PROVIDER || 'openai';
    
//     switch (provider.toLowerCase()) {
//       case 'openai':
//         console.log('✅ OpenAI Service loaded');
//         return openaiService;
      
//       case 'gemini':
//         console.log('✅ Gemini Service loaded');
//         return geminiService;
      
//       case 'huggingface':
//         console.log('✅ Hugging Face Service loaded');
//         return huggingfaceService;
      
//       case 'mock':
//         console.log('✅ Mock Service loaded - No API needed!');
//         return mockService;
      
//       default:
//         console.warn(`⚠️ Unknown provider: ${provider}, defaulting to OpenAI`);
//         return openaiService;
//     }
//   }

//   async sendMessage(messages, onChunk) {
//     try {
//       console.log(`📤 Sending message via ${process.env.REACT_APP_AI_PROVIDER || 'openai'}`);
//       return await this.service.sendMessage(messages, onChunk);
//     } catch (error) {
//       console.error('❌ ChatService Error:', error);
//       throw error;
//     }
//   }

//   resetChat() {
//     try {
//       if (this.service.resetChat) {
//         console.log('🔄 Resetting chat...');
//         this.service.resetChat();
//       }
//     } catch (error) {
//       console.error('Error resetting chat:', error);
//     }
//   }

//   // Get current provider info
//   getProviderInfo() {
//     const provider = process.env.REACT_APP_AI_PROVIDER || 'openai';
//     const models = {
//       openai: process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o-mini',
//       gemini: process.env.REACT_APP_GEMINI_MODEL || 'gemini-pro',
//       huggingface: process.env.REACT_APP_HUGGINGFACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2',
//       mock: 'Demo AI (No API Required)'
//     };

//     return {
//       provider,
//       model: models[provider] || 'unknown'
//     };
//   }
// }

// export default new ChatService();












import openaiService from './openaiService';
import geminiService from './geminiService';
import huggingfaceService from './huggingfaceService';
import mockService from './mockService';
import perplexityService from './perplexityService';
import groqService from './groqService';  // ← ADD THIS

class ChatService {
  constructor() {
    this.service = this.getService();
    const provider = process.env.REACT_APP_AI_PROVIDER || 'openai';
    console.log(`🤖 Using AI Provider: ${provider}`);
  }

  getService() {
    const provider = process.env.REACT_APP_AI_PROVIDER || 'openai';
    
    switch (provider.toLowerCase()) {
      case 'openai':
        console.log('✅ OpenAI Service loaded');
        return openaiService;
      
      case 'gemini':
        console.log('✅ Gemini Service loaded');
        return geminiService;
      
      case 'huggingface':
        console.log('✅ Hugging Face Service loaded');
        return huggingfaceService;
      
      case 'mock':
        console.log('✅ Mock Service loaded - No API needed!');
        return mockService;
      
      case 'perplexity':
        console.log('✅ Perplexity Service loaded');
        return perplexityService;
      
      case 'groq':  // ← ADD THIS
        console.log('✅ Groq Service loaded');
        return groqService;
      
      default:
        console.warn(`⚠️ Unknown provider: ${provider}, defaulting to OpenAI`);
        return openaiService;
    }
  }

  async sendMessage(messages, onChunk) {
    try {
      console.log(`📤 Sending message via ${process.env.REACT_APP_AI_PROVIDER || 'openai'}`);
      return await this.service.sendMessage(messages, onChunk);
    } catch (error) {
      console.error('❌ ChatService Error:', error);
      throw error;
    }
  }

  resetChat() {
    try {
      if (this.service.resetChat) {
        console.log('🔄 Resetting chat...');
        this.service.resetChat();
      }
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  }

  getProviderInfo() {
    const provider = process.env.REACT_APP_AI_PROVIDER || 'openai';
    const models = {
      openai: process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o-mini',
      gemini: process.env.REACT_APP_GEMINI_MODEL || 'gemini-pro',
      huggingface: process.env.REACT_APP_HUGGINGFACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2',
      mock: 'Demo AI (No API Required)',
      perplexity: process.env.REACT_APP_PERPLEXITY_MODEL || 'sonar-small-chat',
      groq: process.env.REACT_APP_GROQ_MODEL || 'llama-3.1-70b-versatile'  // ← ADD THIS
    };

    return {
      provider,
      model: models[provider] || 'unknown'
    };
  }
}

export default new ChatService();
