"use client"

import React, { useState } from "react";
import Message from "./Message";
import {getResponseFromOpenAI} from '../../../utils/openai'

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streamingResponse, setStreamingResponse] = useState('');

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages);

    setStreamingResponse('');

    await getResponseFromOpenAI(updatedMessages, (chunk) => {
      setStreamingResponse(prev => prev + chunk);
    })

    setMessages([...updatedMessages, {role: 'assistant', content: streamingResponse}]);
    setInput('');
  };
  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        {streamingResponse && (
          <Message role="assistant" content={streamingResponse} />
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
