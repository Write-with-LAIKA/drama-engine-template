"use client"
import { useState } from 'react';
import { AllChatsContainer } from './components/AllChatsContainer';
import { DramaProvider } from './contexts/drama-context';

export default function Home() {

  const [baseUrl, setBaseUrl] = useState("https://api.together.xyz");
  const [endpoint, setEndpoint] = useState("/v1/completions");
  const [apiKey, setApiKey] = useState("");
  const [modelName, setModelName] = useState("NousResearch/Nous-Hermes-2-Yi-34B");
  const [ready, setReady] = useState(false);

  const handleOkClick = () => {
    setReady(true);
  };

  return (
    !ready ?
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Enter API details</h2>

          <label>
            Base URL
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </label>
          <br />

          <label>
            Endpoint
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </label>
          <br />

          <label>
            API Key
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </label>
          <br />

          <label>
            Model Name
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </label>
          <br />

          <button
            onClick={handleOkClick}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Start
          </button>
        </div>
      </div> :
      <DramaProvider baseUrl={baseUrl} endpoint={endpoint} apiKey={apiKey} modelName={modelName}>
        <AllChatsContainer />
      </DramaProvider>
  );

}