"use client"

import { useState } from 'react';

export default function Home() {
  const [model, setModel] = useState('meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo');
  const [userMessage, setUserMessage] = useState('Please list 10 landlocked countries.');
  const [result, setResult] = useState('<response shown here>');

  const handleClick = async () => {
    try {
      const jsonParams = {
        model: model, messages: [
          {
            'role': 'user',
            'content': userMessage
          }
        ], max_tokens: 100
      };
      const response = await fetch('/v1/chat/completions', {
        method: "POST",
        body: JSON.stringify(jsonParams)
      });
      const jsonResponse = await response.json();
      const outputText = `${jsonResponse.choices[0]?.message.content || 'An error occured.'}\n\nJSON Response:\n\n${JSON.stringify(jsonResponse)}`;
      setResult(outputText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <label>Model</label>
      <input
        type="text"
        value={model}
        onChange={e => setModel(e.target.value)}
        placeholder="Model"
        className="w-1/5 px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
      <label>Message</label>
      <input
        type="text"
        value={userMessage}
        onChange={e => setUserMessage(e.target.value)}
        placeholder="Message"
        className="w-1/4 px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={handleClick}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Generate
      </button>
      <textarea
        value={result}
        rows={15}
        readOnly
        className="w-1/2 px-3 py-2 mt-3 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
    </div>
  )
}