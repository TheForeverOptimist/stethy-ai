"use client";

import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import {
  getResponseFromOpenAI,
  generateSummaryFromMessages,
} from "../../../utils/openai";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streamingResponse, setStreamingResponse] = useState("");
  const [summary, setSummary] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    let tempStreamingResponse = "";

    const handleData = (chunk) => {
      tempStreamingResponse += chunk;
      setStreamingResponse(tempStreamingResponse);
    };

    await getResponseFromOpenAI(updatedMessages, handleData);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: tempStreamingResponse },
    ]);

    setStreamingResponse("");
    scrollToBottom();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const generate = async () => {
    try {
      console.log("Sending messages for summary generation:", messages); // Debugging statement
      const summaryText = await generateSummaryFromMessages(messages);
      setSummary(summaryText);
    } catch (error) {
      console.error("Error generating summary", error);
    }
  };

  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "pre-medical-visit-note.txt";
    document.body.appendChild(element); //required for firefox
    element.click();
  };

  const canGenerateReport =
    messages.some((msg) => msg.role === "user") &&
    messages.some((msg) => msg.role === "assistant");

  return (
    <div className="chatbox-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        {streamingResponse && (
          <Message role="assistant" content={streamingResponse} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Tell us what's wrong here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="summary">
        <button className="postSendButton" onClick={generate} disabled={!canGenerateReport}>
          Generate Pre-Medical Visit Note
        </button>
        {summary && (
          <div>
            <pre>{summary}</pre>
            <button className="postSendButton" onClick={download}>
              Download Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
