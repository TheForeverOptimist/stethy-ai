import React, {useState} from 'react'
import Message from './Message'
import { getResponseFromOpenAI } from '../../../../utils/openai'

export default function ChatBox(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('')

    const sendMessage = async () => {
        const userMessage = {role: 'user', content: input};
        setMessages([...messages, userMessage])

        const response = await getResponseFromOpenAI([...messages, userMessage]);
        setMessages([...messages, userMessage, response]);

        setMessages([...messages, userMessage, response]);
        setInput('')
    };

    return (
        <div className="chat-container">
            <div className='messages'>
                {messages.map((msg, index) => (
                    <Message key={index} role={msg.role} content={msg.content} />
                ))}
            </div>
            <div className='input-area'>
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )

}