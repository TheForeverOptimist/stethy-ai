"use client"

import React from "react";
import ChatBox from "../components/ChatBox";

export default function Chat() {
  return (
    <div className="container">
      <h1 className="doctor_intro">Chat with our AI Doctor</h1>
      <div className="chat-container">
        <ChatBox />
      </div>
    </div>
  );
}
