class HuggingFaceService {
  constructor() {
    this.apiUrl = '/api/huggingface';
    console.log('✅ HuggingFaceService initialized - using backend proxy');
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
        throw new Error(errorData.error || 'Failed to get response from Hugging Face');
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
      console.error('❌ Hugging Face Service Error:', error);
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
      return 'Invalid API key. Please check your REACT_APP_HUGGINGFACE_API_KEY in .env file. Get one free at https://huggingface.co/settings/tokens';
    }
    if (error.message?.includes('loading')) {
      return 'Model is loading. Please wait 20 seconds and try again.';
    }
    if (error.message?.includes('Failed to fetch')) {
      return 'Cannot connect to backend server. Make sure server.mjs is running on port 5000';
    }
    return error.message || 'Failed to get response from Hugging Face';
  }
}

export default new HuggingFaceService();
