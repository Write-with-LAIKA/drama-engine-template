import { ChatMessage } from "@write-with-laika/drama-engine";

interface ChatProps {
    messages: ChatMessage[];
}

export const ChatHistoryContainer: React.FC<ChatProps> = ({ messages }) => {
    return (
        <div className='w-1/2 flex flex-col items-center justify-center'>
            {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.companion.configuration.kind === 'user' ? 'user-message' : 'bot-message'}`}>
                    <div className="chat-message-content">
                        <p>{message.message.trim()}</p>
                    </div>
                    <div className="chat-message-sender">
                        <p style={{ color: 'darkblue' }} ><strong>{message.companion.configuration.name}</strong></p>
                    </div>
                </div>
            ))}
        </div>
    );
};