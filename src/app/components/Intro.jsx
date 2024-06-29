"use client"

import React, { useEffect, useState } from "react";
import "./Intro.css";
import Options from "../components/Options";

export default function Intro() {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      document.querySelector(".content-wrapper").classList.add("move-up");
    }, 3000);

    const timer2 = setTimeout(() => {
      setShowOptions(true);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="typing-animation">
      <div className="content-wrapper">
        <div className="typing-indicator">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="text-wrapper">
          <span className="text">Hi! How may I assist you?</span>
        </div>
      </div>
      {showOptions && (
        <div className="options-wrapper">
          <Options />
        </div>
      )}
    </div>
  );
}