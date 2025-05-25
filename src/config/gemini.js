


// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;



async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: apiKey
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemma-3-27b-it';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = '';
  
  for await (const chunk of response) {
    fullResponse = fullResponse+chunk.text
    //console.log(fullResponse)
  }
  return fullResponse
}

export default main;
