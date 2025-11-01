// // import express from 'express';
// // import cors from 'cors';
// // import { GoogleGenerativeAI } from '@google/generative-ai';
// // import dotenv from 'dotenv';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Load environment variables
// // dotenv.config({ path: path.join(__dirname, '.env') });

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Get environment variables
// // const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
// // const GEMINI_MODEL = process.env.REACT_APP_GEMINI_MODEL || 'gemini';

// // // Debug logging
// // console.log('🔍 Environment Check:');
// // console.log('   .env file location:', path.join(__dirname, '.env'));
// // console.log('   API Key exists:', !!GEMINI_API_KEY);
// // console.log('   API Key length:', GEMINI_API_KEY?.length || 0);
// // console.log('   API Key starts with AIza:', GEMINI_API_KEY?.startsWith('AIza'));
// // console.log('   Model:', GEMINI_MODEL);

// // if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
// //   console.error('\n❌ GEMINI API KEY NOT FOUND IN .env FILE');
// //   console.error('📍 Expected location:', path.join(__dirname, '.env'));
// //   console.error('📝 Make sure your .env file contains:');
// //   console.error('   REACT_APP_GEMINI_API_KEY=your_actual_key_here\n');
// //   process.exit(1);
// // }

// // const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// // app.post('/api/gemini/chat', async (req, res) => {
// //   try {
// //     const { messages } = req.body;
    
// //     if (!messages || !Array.isArray(messages)) {
// //       return res.status(400).json({ error: 'Invalid request: messages array required' });
// //     }

// //     const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    
// //     const history = messages.slice(0, -1).map(msg => ({
// //       role: msg.role === 'assistant' ? 'model' : 'user',
// //       parts: [{ text: msg.content }]
// //     }));

// //     const chat = model.startChat({
// //       history: history,
// //       generationConfig: {
// //         temperature: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
// //         maxOutputTokens: parseInt(process.env.REACT_APP_MAX_TOKENS) || 2000,
// //       },
// //     });

// //     const lastMessage = messages[messages.length - 1];
// //     const result = await chat.sendMessageStream(lastMessage.content);

// //     res.setHeader('Content-Type', 'text/event-stream');
// //     res.setHeader('Cache-Control', 'no-cache');
// //     res.setHeader('Connection', 'keep-alive');

// //     for await (const chunk of result.stream) {
// //       const chunkText = chunk.text();
// //       res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
// //     }

// //     res.write('data: [DONE]\n\n');
// //     res.end();

// //   } catch (error) {
// //     console.error('❌ Gemini API Error:', error);
// //     res.status(500).json({ 
// //       error: error.message || 'Failed to get response from Gemini'
// //     });
// //   }
// // });

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`\n🚀 Backend proxy server running on http://localhost:${PORT}`);
// //   console.log(`✅ Gemini API configured with model: ${GEMINI_MODEL}`);
// //   console.log(`🔑 API Key: ${GEMINI_API_KEY.substring(0, 10)}...${GEMINI_API_KEY.substring(GEMINI_API_KEY.length - 4)}\n`);
// // });



// import express from 'express';
// import cors from 'cors';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, '.env') });

// const app = express();
// app.use(cors());
// app.use(express.json());

// const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
// const GEMINI_MODEL = 'gemini-1.5-flash-latest';

// console.log('🔍 Environment Check:');
// console.log('   .env file location:', path.join(__dirname, '.env'));
// console.log('   API Key exists:', !!GEMINI_API_KEY);
// console.log('   API Key length:', GEMINI_API_KEY?.length || 0);
// console.log('   API Key starts with AIza:', GEMINI_API_KEY?.startsWith('AIza'));
// console.log('   Model:', GEMINI_MODEL);

// if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
//   console.error('\n❌ GEMINI API KEY NOT FOUND IN .env FILE');
//   process.exit(1);
// }

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// app.post('/api/gemini/chat', async (req, res) => {
//   try {
//     const { messages } = req.body;
    
//     if (!messages || !Array.isArray(messages)) {
//       return res.status(400).json({ error: 'Invalid request: messages array required' });
//     }

//     const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    
//     const history = messages.slice(0, -1).map(msg => ({
//       role: msg.role === 'assistant' ? 'model' : 'user',
//       parts: [{ text: msg.content }]
//     }));

//     const chat = model.startChat({
//       history: history,
//       generationConfig: {
//         temperature: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
//         maxOutputTokens: parseInt(process.env.REACT_APP_MAX_TOKENS) || 2000,
//       },
//     });

//     const lastMessage = messages[messages.length - 1];
//     const result = await chat.sendMessageStream(lastMessage.content);

//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');

//     for await (const chunk of result.stream) {
//       const chunkText = chunk.text();
//       res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
//     }

//     res.write('data: [DONE]\n\n');
//     res.end();

//   } catch (error) {
//     console.error('❌ Gemini API Error:', error);
//     res.status(500).json({ 
//       error: error.message || 'Failed to get response from Gemini'
//     });
//   }
// });

// app.post('/api/gemini/reset', (req, res) => {
//   res.json({ success: true, message: 'Chat reset' });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`\n🚀 Backend proxy server running on http://localhost:${PORT}`);
//   console.log(`✅ Gemini API configured with model: ${GEMINI_MODEL}`);
//   console.log(`🔑 API Key: ${GEMINI_API_KEY.substring(0, 10)}...${GEMINI_API_KEY.substring(GEMINI_API_KEY.length - 4)}\n`);
// });















// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables
// dotenv.config({ path: path.join(__dirname, '.env') });

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Get environment variables
// const HUGGINGFACE_API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY;
// const HUGGINGFACE_MODEL = process.env.REACT_APP_HUGGINGFACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';

// // Debug logging
// console.log('🔍 Environment Check:');
// console.log('   .env file location:', path.join(__dirname, '.env'));
// console.log('   API Key exists:', !!HUGGINGFACE_API_KEY);
// console.log('   API Key length:', HUGGINGFACE_API_KEY?.length || 0);
// console.log('   API Key starts with hf_:', HUGGINGFACE_API_KEY?.startsWith('hf_'));
// console.log('   Model:', HUGGINGFACE_MODEL);

// if (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === 'your_huggingface_api_key_here') {
//   console.error('\n❌ HUGGING FACE API KEY NOT FOUND IN .env FILE');
//   console.error('📍 Expected location:', path.join(__dirname, '.env'));
//   console.error('📝 Make sure your .env file contains:');
//   console.error('   REACT_APP_HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx\n');
//   console.error('🔗 Get your free API key at: https://huggingface.co/settings/tokens\n');
//   process.exit(1);
// }

// app.post('/api/huggingface/chat', async (req, res) => {
//   try {
//     const { messages } = req.body;
    
//     if (!messages || !Array.isArray(messages)) {
//       return res.status(400).json({ error: 'Invalid request: messages array required' });
//     }

//     // Convert messages to prompt format for Hugging Face
//     const prompt = messages.map(msg => {
//       const role = msg.role === 'user' ? 'User' : 'Assistant';
//       return `${role}: ${msg.content}`;
//     }).join('\n') + '\nAssistant:';

//     console.log('📤 Sending request to Hugging Face...');

//     // Call Hugging Face Inference API
//     const response = await fetch(
//       `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL}`,
//       {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           inputs: prompt,
//           parameters: {
//             max_new_tokens: parseInt(process.env.REACT_APP_MAX_TOKENS) || 500,
//             temperature: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
//             return_full_text: false,
//             do_sample: true,
//           },
//           options: {
//             use_cache: false,
//             wait_for_model: true
//           }
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ Hugging Face API Error:', errorText);
      
//       if (response.status === 503) {
//         return res.status(503).json({ 
//           error: 'Model is loading. Please try again in 20 seconds.' 
//         });
//       }
      
//       throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
//     }

//     const data = await response.json();
//     console.log('✅ Received response from Hugging Face');

//     // Hugging Face returns array of generated text
//     const generatedText = data[0]?.generated_text || data.generated_text || '';

//     // Stream response back to client
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');

//     // Simulate streaming by sending chunks
//     const words = generatedText.split(' ');
//     for (let i = 0; i < words.length; i++) {
//       const word = words[i] + (i < words.length - 1 ? ' ' : '');
//       res.write(`data: ${JSON.stringify({ text: word })}\n\n`);
//       // Small delay to simulate streaming
//       await new Promise(resolve => setTimeout(resolve, 20));
//     }

//     res.write('data: [DONE]\n\n');
//     res.end();

//   } catch (error) {
//     console.error('❌ Server Error:', error);
//     res.status(500).json({ 
//       error: error.message || 'Failed to get response from Hugging Face'
//     });
//   }
// });

// app.post('/api/huggingface/reset', (req, res) => {
//   res.json({ success: true, message: 'Chat reset' });
// });

// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'ok',
//     provider: 'huggingface',
//     model: HUGGINGFACE_MODEL,
//     timestamp: new Date().toISOString()
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`\n🚀 Backend proxy server running on http://localhost:${PORT}`);
//   console.log(`✅ Hugging Face API configured with model: ${HUGGINGFACE_MODEL}`);
//   console.log(`🔑 API Key: ${HUGGINGFACE_API_KEY.substring(0, 8)}...${HUGGINGFACE_API_KEY.substring(HUGGINGFACE_API_KEY.length - 4)}\n`);
//   console.log(`💡 Note: First request might take 20-30 seconds while model loads\n`);
// });
