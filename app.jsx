function ChatInput({ setMessages }) {
    const [inputValue, setInputValue] = React.useState('');

    const inputChange = (event) => {
        setInputValue(event.target.value);
    };

    const SendMessage = () => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput === '') return;

        const userMessage = {
            message: trimmedInput,
            sender: 'user',
            id: crypto.randomUUID()
        };

        const aiReply = chatbot.getResponse(trimmedInput);
        const aiMessage = {
            message: aiReply,
            sender: 'robot',
            id: crypto.randomUUID()
        };

        setMessages(currentMessages => [...currentMessages, userMessage, aiMessage]);
        setInputValue('');
    };

    return (
        <div className="ChatInput">
            <input
                className="InputText"
                type="text"
                placeholder="Type message here"
                onChange={inputChange}
                value={inputValue}
                onKeyDown={(e) => e.key === 'Enter' && SendMessage()}
            />
            <button className="SendButton" onClick={SendMessage}>
                Send
            </button>
        </div>
    );
}

function ChatMessages({ messages }) {
    return (
        <>
            {messages.map((message) => (
                message.sender === "user"
                    ? (
                        <div key={message.id} className="user-message">
                            <div className="chats">
                                {message.message}
                            </div>
                            <img className="user-image" src="icons8-user-64.png" alt="User" />
                        </div>
                    )
                    : (
                        <div key={message.id} className="ai-message">
                            <img className="ai-image" src="icons8-ai-30.png" alt="AI" />
                            <div className="chats">
                                {message.message}
                            </div>
                        </div>
                    )
            ))}
        </>
    );
}

function App() {
    const [messages, setMessages] = React.useState([]);
    return (
        <div className="app">
            <ChatMessages messages={messages} />
            <ChatInput setMessages={setMessages} />
        </div>
    );
}

const container = document.getElementById('container');
const root = ReactDOM.createRoot(container);
root.render(<App />);