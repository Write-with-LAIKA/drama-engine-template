"use client"
import { AllChatsContainer } from './components/AllChatsContainer';
import { DramaProvider } from './contexts/drama-context';

export default function Home() {

  return (
    <DramaProvider>
      <AllChatsContainer />
    </DramaProvider>
  )
}