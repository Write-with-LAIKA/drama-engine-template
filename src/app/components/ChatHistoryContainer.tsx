import { ChatMessage } from "@write-with-laika/drama-engine";

interface ChatProps {
    messages: ChatMessage[];
}

export const ChatHistoryContainer: React.FC<ChatProps> = ({ messages }) => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            {messages.map((message, index) => (
                <div key={index} className={`rounded-md p-2 chat-message ${message.companion.configuration.kind === 'user' ? 'user-message' : 'bot-message'}`}>
                    <div className="chat-message-content">
                        <p>{message.message.trim()}</p>
                    </div>
                    <div className="chat-message-sender">
                        <p className="font-thin text-xs">{message.companion.configuration.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};