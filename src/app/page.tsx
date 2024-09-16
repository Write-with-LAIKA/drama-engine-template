"use client"
import { useState } from 'react';
import { AllChatsContainer } from './components/AllChatsContainer';
import { DramaProvider } from './contexts/drama-context';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
        <div className="w-1/2">
          <p className='font-semibold'>Drama Engine configuration</p>
          <p className='text-black/60 text-sm my-2'>Please enter the endpoint configuration and the model name. You can find all of these in the API documentation of your inference provider.</p>
          
          <Table>
            <TableBody>
              <TableRow key="base_url">
                <TableCell className="font-medium">Base URL</TableCell>
                <TableCell><Input className='mx-1' value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)}></Input></TableCell>
              </TableRow>
              <TableRow key="endpoint">
                <TableCell className="font-medium">Endpoint</TableCell>
                <TableCell><Input className='mx-1' value={endpoint} onChange={(e) => setEndpoint(e.target.value)}></Input></TableCell>
              </TableRow>
              <TableRow key="apiKey">
                <TableCell className="font-medium">API key</TableCell>
                <TableCell><Input className='mx-1' value={apiKey} onChange={(e) => setApiKey(e.target.value)}></Input></TableCell>
              </TableRow>
              <TableRow key="modelName">
                <TableCell className="font-medium">Model name</TableCell>
                <TableCell><Input className='mx-1' value={modelName} onChange={(e) => setModelName(e.target.value)}></Input></TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button
            onClick={handleOkClick}
            className="my-4"
          >
            Connect
          </Button>
        </div>
      </div> :
      <DramaProvider baseUrl={baseUrl} endpoint={endpoint} apiKey={apiKey} modelName={modelName}>
        <AllChatsContainer />
      </DramaProvider>
  );

}