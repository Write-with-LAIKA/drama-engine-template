"use client"
import { useState } from 'react';
import { AllChatsContainer } from './components/AllChatsContainer';
import { DramaProvider } from './contexts/drama-context';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {

  const [baseUrl, setBaseUrl] = useState("https://api.together.xyz");
  const [endpoint, setEndpoint] = useState("/v1/completions");
  const [apiKey, setApiKey] = useState("");
  const [modelName, setModelName] = useState("NousResearch/Nous-Hermes-2-Yi-34B");
  const [ready, setReady] = useState(false);

  const validConfiguration = () => apiKey.length > 0;

  const handleOkClick = () => {
    setReady(true);
  };

  return (
    !ready ?
      <div className="w-full p-8 bg-gray-50">
        <div className="w-2/3 mx-auto">
          {/* <p className='font-semibold'>Drama Engine configuration</p> */}

          <div className="my-4 text-sm text-black/70 flex-row flex items-center">
            <Image className="mr-2" src="/laika.svg" width={32} height={32} alt="Vercel Logo" />
            <p className=""><Link className="underline" href="https://drama-engine.com">Drama Engine</Link> chat template</p>
          </div>

          <p className='text-black/60 text-sm my-4'>Please enter your endpoint configuration and the <Link className='underline' href="https://docs.together.ai/docs/chat-models">model name</Link>.
            You can find all of these in the API documentation of your inference provider.
            We have tested the service with <Link className='underline' href={"http://together.ai"}>Together AI</Link> and <Link className='underline' href="http://novita.ai">Novita AI</Link>.</p>

          <div className="bg-white rounded-xl border-black/5 border-2 p-2 flex flex-col">
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
                  <TableCell className="font-medium">API Model String</TableCell>
                  <TableCell><Input className='mx-1' value={modelName} onChange={(e) => setModelName(e.target.value)}></Input></TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Button
              onClick={handleOkClick}
              disabled={!validConfiguration()}
              className="mt-4"
            >
              Connect
            </Button>
          </div>
        </div>
      </div> :
      <DramaProvider baseUrl={baseUrl} endpoint={endpoint} apiKey={apiKey} modelName={modelName}>
        <AllChatsContainer />
      </DramaProvider>
  );

}