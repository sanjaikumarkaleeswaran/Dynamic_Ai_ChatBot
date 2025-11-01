class MockService {
  constructor() {
    console.log('✅ MockService initialized - No API needed!');
  }

  async sendMessage(messages, onChunk) {
    try {
      // Get the last user message
      const lastMessage = messages[messages.length - 1];
      const userMessage = lastMessage.content.toLowerCase();

      // Generate contextual responses
      let response = this.generateResponse(userMessage);

      // Simulate streaming by sending word by word
      const words = response.split(' ');
      let fullResponse = '';

      for (let i = 0; i < words.length; i++) {
        const word = words[i] + (i < words.length - 1 ? ' ' : '');
        fullResponse += word;
        
        if (onChunk) {
          onChunk(word);
        }
        
        // Simulate realistic typing delay
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      return fullResponse;

    } catch (error) {
      console.error('❌ Mock Service Error:', error);
      throw new Error('Failed to generate mock response');
    }
  }

  generateResponse(userMessage) {
    // Smart contextual responses based on keywords
    const responses = {
      hello: [
        "Hello! I'm a demo AI chatbot. How can I help you today?",
        "Hi there! Welcome to the chatbot demo. What would you like to talk about?",
        "Hey! Great to see you. What's on your mind?"
      ],
      how: [
        "I'm doing great! I'm a demo AI assistant built with React. How are you?",
        "I'm functioning perfectly! This is a demonstration chatbot. How can I assist you?"
      ],
      help: [
        "I can help you test this chatbot interface! Try asking me anything - I'll give you demo responses.",
        "This is a demo chatbot. You can ask me questions, and I'll respond to test the UI!"
      ],
      what: [
        "I'm a demonstration AI chatbot built with React and Node.js. I generate realistic responses to help you test the interface!",
        "I'm a mock AI service that simulates a real chatbot. Perfect for testing your UI without API costs!"
      ],
      joke: [
        "Why did the programmer quit his job? Because he didn't get arrays! 😄",
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "What's a programmer's favorite hangout place? The Foo Bar! 🍺"
      ],
      thank: [
        "You're welcome! Happy to help test this chatbot with you! 😊",
        "No problem! Glad I could assist with testing the interface!",
        "Anytime! This demo is working great, isn't it?"
      ],
      bye: [
        "Goodbye! Thanks for testing the chatbot demo!",
        "See you later! Feel free to come back anytime to test more features!",
        "Bye! Hope the demo was helpful! 👋"
      ]
    };

    // Check for keyword matches
    for (const [keyword, responseList] of Object.entries(responses)) {
      if (userMessage.includes(keyword)) {
        return responseList[Math.floor(Math.random() * responseList.length)];
      }
    }

    // Default responses if no keyword match
    const defaultResponses = [
      `That's interesting! You said: "${userMessage.substring(0, 50)}..." This is a demo response showing how the chatbot works.`,
      `I understand you're asking about "${userMessage.substring(0, 30)}..." As a demo AI, I'm here to help you test the interface!`,
      `Great question! This chatbot demo can handle various inputs. Your message was: "${userMessage.substring(0, 40)}..."`,
      `I'm processing your message about "${userMessage.substring(0, 30)}..." Remember, I'm a demo AI designed to test the UI functionality!`,
      `Interesting! In a real implementation, an AI would analyze "${userMessage.substring(0, 40)}..." and provide a detailed response.`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  resetChat() {
    console.log('🔄 Mock chat reset - ready for new conversation!');
  }
}

export default new MockService();
