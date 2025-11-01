class GroqService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GROQ_API_KEY;
    this.model = process.env.REACT_APP_GROQ_MODEL || 'llama-3.1-70b-versatile';
    this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    console.log('✅ Groq Service initialized');
  }

  async sendMessage(messages, onChunk) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
          max_tokens: parseInt(process.env.REACT_APP_MAX_TOKENS) || 2000,
          stream: true
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${errorText}`);
      }

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
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) {
                fullResponse += content;
                if (onChunk) onChunk(content);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      return fullResponse;

    } catch (error) {
      console.error('❌ Groq API Error:', error);
      throw error;
    }
  }

  resetChat() {
    // No state to reset
  }
}

export default new GroqService();
