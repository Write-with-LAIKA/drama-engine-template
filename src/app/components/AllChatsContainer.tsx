import { Chat, Context } from "@write-with-laika/drama-engine";
import { useContext, useState, useEffect } from "react";
import { DramaContext } from "../contexts/drama-context";
import { ChatTabsContainer } from "./ChatTabsContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export const AllChatsContainer = () => {
    const drama = useContext(DramaContext);

    const [userMessage, setUserMessage] = useState('Hey there! My name is Yuri and I\'m new here.');
    const [loading, setLoading] = useState(false);
    const [chat, setTheChat] = useState<Chat>();

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        async function processChat() {
            if (!loading || !drama) {
                setLoading(false);
                return;
            }
            const chats = drama.chats[activeTabIndex];
            const context = new Context(undefined, drama.companions, chats.id, chats.situation);

            const you = drama.companions.find(c => c.configuration.name.toLowerCase() === "you");
            chats.appendMessage(you!, userMessage)

            const rounds = 2;
            await drama.runConversation(chats, rounds, context, undefined, undefined, setTheChat);

            setLoading(false);
            setUserMessage('');
        }
        processChat();
    }, [drama, loading, userMessage, activeTabIndex])

    const handleClick = async () => {
        setLoading(true);
    };

    return (
        <div className="w-full p-8">
            <div className="w-2/3 mx-auto my-4 px-4 text-sm text-black/70 flex-row flex items-center">
                <Image className="mr-2" src="/laika.svg" width={32} height={32} alt="Vercel Logo" />
                <p className=""><Link className="underline" href="https://drama-engine.com">Drama Engine</Link> chat template</p>
            </div>
            <p className='w-2/3 mx-auto text-black/60 text-sm my-4'>
                This template showcases chat with two companions individually and in a group chat. Edit the companions in <span className="font-mono bg-gray-200">companions.ts</span> to change their personality. More information can be found on the <Link className="underline" href="https://drama-engine.com">project site</Link> and in the <Link className="underline" href="https://github.com/Write-with-LAIKA/drama-engine">git repository</Link>.
            </p>

            <div className="bg-white w-2/3 mx-auto rounded-xl border-black/5 border-2 min-h-[500px] p-2 flex flex-col">
                <div className="flex-grow">
                    <ChatTabsContainer drama={drama} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
                </div>
                <Separator className="w-full my-2" />
                <div>
                    <div className='flex flex-row w-full'>
                        <Input
                            type="text"
                            value={userMessage}
                            onChange={e => setUserMessage(e.target.value)}

                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleClick()
                                }
                            }}
                            placeholder="Message"
                            className="flex-grow mx-0"
                        />
                        <Button
                            onClick={handleClick}
                            className="ml-2"
                        >
                            Talk
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}