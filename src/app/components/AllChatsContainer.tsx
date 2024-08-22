import { Chat, Context } from "@write-with-laika/drama-engine";
import { useContext, useState, useEffect } from "react";
import { DramaContext } from "../contexts/drama-context";
import { ChatTabsContainer } from "./ChatTabsContainer";

export const AllChatsContainer = () => {
    const drama = useContext(DramaContext);

    const [userMessage, setUserMessage] = useState('Hey there! My name is Yuri and I\'m new here.');
    const [loading, setLoading] = useState(false);
    const [chat, setTheChat] = useState<Chat>();

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        async function processChat() {
            if (!loading || !drama) {
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
        <div className='flex flex-col h-screen'>
            <ChatTabsContainer drama={drama} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
            <div className='flex-row w-full'>
                <input
                    type="text"
                    value={userMessage}
                    onChange={e => setUserMessage(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleClick()
                        }
                    }}
                    placeholder="Message"
                    className="w-1/4 px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                    onClick={handleClick}
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                    Generate
                </button>
            </div>
        </div>
    )
}