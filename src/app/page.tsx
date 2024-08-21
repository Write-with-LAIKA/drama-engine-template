"use client"

import { useState } from 'react';

export default function Home() {
  const [model, setModel] = useState('meta-llama/Llama-3-8b-hf');
  const [prompt, setPrompt] = useState('What is the capital of France ?');
  const [result, setResult] = useState('<response shown here>');

  const handleClick = async () => {
    try {
      const jsonParams = { model: model, prompt: prompt }
      const response = await fetch('/v1/completions', {
        method: "POST",
        body: JSON.stringify(jsonParams),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept-Encoding': 'identity'
        }),
      });
      setResult(JSON.stringify(await response.json()));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <input
        type="text"
        value={model}
        onChange={e => setModel(e.target.value)}
        placeholder="Model"
        className="w-1/5 px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Prompt"
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
        readOnly
        className="w-1/2 px-3 py-2 mt-3 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
    </div>
  )
}