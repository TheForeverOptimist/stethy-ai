"use client"

import React, { useState } from "react";
import Message from "./Message";
import {getResponseFromOpenAI} from '../../../utils/openai'

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  console.log(messages)

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages);
    console.log(updatedMessages)

    try{
      const response = await getResponseFromOpenAI(updatedMessages);
      if(response){
        setMessages([...updatedMessages, response]);
      } else{
        throw new Error("the response from open ai didn't work")
      }
    } catch(error){
      console.error("Error:", error)
    }
    setInput("");
  };
  console.log(input)

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
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