"use client"

import React, { useState } from "react";
import Message from "./Message";
import {getResponseFromOpenAI} from '../../../utils/openai'

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streamingResponse, setStreamingResponse] = useState('');
  const [summary, setSummary] = useState('')

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages);

    let tempStreamingResponse = '';

    const handleData = (chunk) => {
      tempStreamingResponse += chunk;
      setStreamingResponse(tempStreamingResponse)
    }

    await getResponseFromOpenAI(updatedMessages, handleData)

    setMessages((prevMessages) => [
      ...prevMessages,
      {role: 'assistant', content: tempStreamingResponse}
    ])
    setInput('');
    setStreamingResponse('')
  };

const generateSummary = async () => {
  const response = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  setSummary(data.summary);
};




  return (
    <div className="chatbox-container">
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
      <div className="summary">
        <button onClick={generateSummary}>Generate Pre-Medical Visit Note</button>
        {summary && <pre>{summary}</pre>}
      </div>
    </div>
  );
}
