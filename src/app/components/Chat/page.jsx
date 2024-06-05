import ChatBox from "./ChatBox"

export default function ChatPage(){
    return (
        <div className="container">
            <h1>Chat with our AI Doctor</h1>
            <div className="chat-container">
                <ChatBox />
            </div>
        </div>
    )
}